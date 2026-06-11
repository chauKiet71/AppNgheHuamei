import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'crypto';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { promisify } from 'util';
import { DatabaseService } from '../database.service';

const scrypt = promisify(scryptCallback);

type UserRecord = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  passwordHash: string;
  sessionToken?: string | null;
  createdAt: string;
  updatedAt: string;
};

type PublicUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

type AuthResult = {
  token: string;
  user: PublicUser;
};

type DbUserRow = {
  id: string;
  name: string;
  email: string;
  avatar_url?: string | null;
  password_hash: string;
  session_token: string | null;
  created_at: string;
  updated_at: string;
};

@Injectable()
export class AuthService {
  private readonly usersFile = join(process.cwd(), 'data', 'users.json');

  constructor(private readonly database: DatabaseService) {}

  async register(input: { name?: string; email?: string; password?: string }): Promise<AuthResult> {
    const name = String(input.name || '').trim();
    const email = this.normalizeEmail(input.email);
    const password = String(input.password || '');

    if (!name) {
      throw new BadRequestException('Vui lòng nhập họ và tên.');
    }
    if (!this.isValidEmail(email)) {
      throw new BadRequestException('Email không hợp lệ.');
    }
    if (password.length < 6) {
      throw new BadRequestException('Mật khẩu phải có ít nhất 6 ký tự.');
    }

    const existing = await this.findByEmail(email);
    if (existing) {
      throw new BadRequestException('Email này đã được đăng ký.');
    }

    const now = new Date().toISOString();
    const user: UserRecord = {
      id: this.id('user'),
      name,
      email,
      avatarUrl: '',
      passwordHash: await this.hashPassword(password),
      sessionToken: this.token(),
      createdAt: now,
      updatedAt: now,
    };

    await this.insertUser(user);
    return { token: user.sessionToken || '', user: this.publicUser(user) };
  }

  async login(input: { email?: string; password?: string }): Promise<AuthResult> {
    const email = this.normalizeEmail(input.email);
    const password = String(input.password || '');
    const user = await this.findByEmail(email);

    if (!user || !(await this.verifyPassword(password, user.passwordHash))) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng.');
    }

    const token = this.token();
    await this.setSession(user.id, token);
    return { token, user: this.publicUser(user) };
  }

  async me(token?: string): Promise<PublicUser> {
    const user = await this.findByToken(this.cleanBearer(token));
    if (!user) {
      throw new UnauthorizedException('Phiên đăng nhập không hợp lệ.');
    }
    return this.publicUser(user);
  }

  async updateMe(token: string | undefined, input: { name?: string; email?: string; password?: string; avatarUrl?: string }): Promise<PublicUser> {
    const user = await this.findByToken(this.cleanBearer(token));
    if (!user) {
      throw new UnauthorizedException('Phiên đăng nhập không hợp lệ.');
    }

    const name = String(input.name || '').trim();
    const email = this.normalizeEmail(input.email);
    const password = String(input.password || '');
    const avatarUrl = String(input.avatarUrl || '').trim();

    if (!name) {
      throw new BadRequestException('Vui lòng nhập họ và tên.');
    }
    if (!this.isValidEmail(email)) {
      throw new BadRequestException('Email không hợp lệ.');
    }
    if (password && password.length < 6) {
      throw new BadRequestException('Mật khẩu mới phải có ít nhất 6 ký tự.');
    }

    const existing = await this.findByEmail(email);
    if (existing && existing.id !== user.id) {
      throw new BadRequestException('Email này đã được sử dụng.');
    }

    user.name = name;
    user.email = email;
    if (avatarUrl) {
      user.avatarUrl = avatarUrl;
    }
    if (password) {
      user.passwordHash = await this.hashPassword(password);
    }
    user.updatedAt = new Date().toISOString();

    await this.updateUser(user);
    return this.publicUser(user);
  }

  async updateAvatar(token: string | undefined, avatarUrl: string): Promise<PublicUser> {
    const user = await this.findByToken(this.cleanBearer(token));
    if (!user) {
      throw new UnauthorizedException('Phiên đăng nhập không hợp lệ.');
    }
    if (!avatarUrl) {
      throw new BadRequestException('Ảnh đại diện không hợp lệ.');
    }
    user.avatarUrl = avatarUrl;
    user.updatedAt = new Date().toISOString();
    await this.updateUser(user);
    return this.publicUser(user);
  }

  async logout(token?: string): Promise<{ ok: true }> {
    const cleanToken = this.cleanBearer(token);
    if (cleanToken) {
      await this.clearSession(cleanToken);
    }
    return { ok: true };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const derived = (await scrypt(password, salt, 64)) as Buffer;
    return `${salt}:${derived.toString('hex')}`;
  }

  private async verifyPassword(password: string, stored: string): Promise<boolean> {
    const [salt, hash] = stored.split(':');
    if (!salt || !hash) {
      return false;
    }
    const derived = (await scrypt(password, salt, 64)) as Buffer;
    const expected = Buffer.from(hash, 'hex');
    return expected.length === derived.length && timingSafeEqual(expected, derived);
  }

  private async findByEmail(email: string): Promise<UserRecord | null> {
    if (this.database.enabled) {
      const rows = await this.database.query<DbUserRow>('select * from app_users where email = $1 limit 1', [email]);
      return rows[0] ? this.fromDb(rows[0]) : null;
    }
    const users = await this.readLocalUsers();
    return users.find((user) => user.email === email) || null;
  }

  private async findByToken(token?: string): Promise<UserRecord | null> {
    if (!token) {
      return null;
    }
    if (this.database.enabled) {
      const rows = await this.database.query<DbUserRow>('select * from app_users where session_token = $1 limit 1', [token]);
      return rows[0] ? this.fromDb(rows[0]) : null;
    }
    const users = await this.readLocalUsers();
    return users.find((user) => user.sessionToken === token) || null;
  }

  private async insertUser(user: UserRecord): Promise<void> {
    if (this.database.enabled) {
      await this.database.query(
        `insert into app_users (id, name, email, avatar_url, password_hash, session_token, created_at, updated_at)
         values ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [user.id, user.name, user.email, user.avatarUrl || null, user.passwordHash, user.sessionToken, user.createdAt, user.updatedAt],
      );
      return;
    }
    const users = await this.readLocalUsers();
    users.push(user);
    await this.writeLocalUsers(users);
  }

  private async setSession(userId: string, token: string): Promise<void> {
    if (this.database.enabled) {
      await this.database.query('update app_users set session_token = $1, updated_at = now() where id = $2', [token, userId]);
      return;
    }
    const users = await this.readLocalUsers();
    const user = users.find((item) => item.id === userId);
    if (user) {
      user.sessionToken = token;
      user.updatedAt = new Date().toISOString();
      await this.writeLocalUsers(users);
    }
  }

  private async updateUser(user: UserRecord): Promise<void> {
    if (this.database.enabled) {
      await this.database.query(
        `update app_users
         set name = $1, email = $2, avatar_url = $3, password_hash = $4, updated_at = now()
         where id = $5`,
        [user.name, user.email, user.avatarUrl || null, user.passwordHash, user.id],
      );
      return;
    }

    const users = await this.readLocalUsers();
    const index = users.findIndex((item) => item.id === user.id);
    if (index >= 0) {
      users[index] = user;
      await this.writeLocalUsers(users);
    }
  }

  private async clearSession(token: string): Promise<void> {
    if (this.database.enabled) {
      await this.database.query('update app_users set session_token = null, updated_at = now() where session_token = $1', [token]);
      return;
    }
    const users = await this.readLocalUsers();
    for (const user of users) {
      if (user.sessionToken === token) {
        user.sessionToken = null;
        user.updatedAt = new Date().toISOString();
      }
    }
    await this.writeLocalUsers(users);
  }

  private async readLocalUsers(): Promise<UserRecord[]> {
    try {
      return JSON.parse(await readFile(this.usersFile, 'utf8')) as UserRecord[];
    } catch {
      return [];
    }
  }

  private async writeLocalUsers(users: UserRecord[]): Promise<void> {
    await mkdir(join(process.cwd(), 'data'), { recursive: true });
    await writeFile(this.usersFile, JSON.stringify(users, null, 2), 'utf8');
  }

  private fromDb(row: DbUserRow): UserRecord {
      return {
      id: row.id,
      name: row.name,
      email: row.email,
      avatarUrl: row.avatar_url || undefined,
      passwordHash: row.password_hash,
      sessionToken: row.session_token,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private publicUser(user: UserRecord): PublicUser {
    return { id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl };
  }

  private normalizeEmail(email?: string): string {
    return String(email || '').trim().toLowerCase();
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private cleanBearer(value?: string): string {
    return String(value || '').replace(/^Bearer\s+/i, '').trim();
  }

  private token(): string {
    return randomBytes(32).toString('hex');
  }

  private id(prefix: string): string {
    return `${prefix}-${Date.now().toString(36)}-${randomBytes(4).toString('hex')}`;
  }
}
