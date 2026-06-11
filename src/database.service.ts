import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly pool?: Pool;

  constructor() {
    if (process.env.DISABLE_DATABASE === '1') {
      return;
    }

    if (process.env.DATABASE_URL) {
      this.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_URL.includes('sslmode=disable') ? false : { rejectUnauthorized: false },
      });
    }
  }

  get enabled(): boolean {
    return Boolean(this.pool);
  }

  async onModuleInit(): Promise<void> {
    if (!this.pool) {
      return;
    }

    await this.pool.query(`
      create table if not exists listening_topics (
        id text primary key,
        position integer not null default 0,
        data jsonb not null,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      )
    `);

    await this.pool.query(`
      create table if not exists app_users (
        id text primary key,
        name text not null,
        email text not null unique,
        avatar_url text,
        password_hash text not null,
        session_token text,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      )
    `);

    await this.pool.query('alter table app_users add column if not exists avatar_url text');

    await this.pool.query(`
      create table if not exists learning_history (
        id text primary key,
        user_id text not null references app_users(id) on delete cascade,
        topic_id text,
        level_id text,
        section_id text,
        lesson_id text,
        day_id text not null,
        topic_title text,
        level_title text,
        section_title text,
        lesson_title text,
        day_title text,
        correct_count integer not null default 0,
        answered_count integer not null default 0,
        total_count integer not null default 0,
        accuracy integer not null default 0,
        duration_seconds integer not null default 0,
        completed_at timestamptz not null default now(),
        created_at timestamptz not null default now()
      )
    `);
    await this.pool.query('create index if not exists learning_history_user_completed_idx on learning_history (user_id, completed_at desc)');
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool?.end();
  }

  async query<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
    if (!this.pool) {
      throw new Error('DATABASE_URL is not configured.');
    }

    const result = await this.pool.query(sql, params);
    return result.rows as T[];
  }
}
