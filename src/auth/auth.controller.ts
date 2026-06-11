import { BadRequestException, Body, Controller, Get, Headers, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createHash } from 'crypto';
import { extname } from 'path';
import { memoryStorage, MulterFile } from 'multer';
import { AuthService } from './auth.service';

type CloudinaryUploadResponse = {
  secure_url?: string;
  original_filename?: string;
  error?: { message?: string };
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: { name?: string; email?: string; password?: string }) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: { email?: string; password?: string }) {
    return this.authService.login(body);
  }

  @Get('me')
  me(@Headers('authorization') authorization?: string) {
    return this.authService.me(authorization);
  }

  @Patch('me')
  updateMe(@Headers('authorization') authorization: string | undefined, @Body() body: { name?: string; email?: string; password?: string; avatarUrl?: string }) {
    return this.authService.updateMe(authorization, body);
  }

  @Post('me/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: memoryStorage(),
      fileFilter: (_request, file, callback) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
        const extension = extname(file.originalname).toLowerCase();
        callback(null, file.mimetype.startsWith('image/') || allowedExtensions.includes(extension));
      },
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  async uploadAvatar(@Headers('authorization') authorization: string | undefined, @UploadedFile() file: MulterFile) {
    if (!file) {
      throw new BadRequestException('Image file is required. Supported formats: jpg, png, webp, gif.');
    }
    const avatarUrl = await this.uploadAvatarToCloudinary(file);
    return this.authService.updateAvatar(authorization, avatarUrl);
  }

  @Post('logout')
  logout(@Headers('authorization') authorization?: string) {
    return this.authService.logout(authorization);
  }

  private async uploadAvatarToCloudinary(file: MulterFile): Promise<string> {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      throw new BadRequestException(
        'Missing Cloudinary config. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.',
      );
    }

    const timestamp = Math.round(Date.now() / 1000).toString();
    const folder = process.env.CLOUDINARY_AVATAR_FOLDER || 'app-nghe-v1/avatars';
    const publicId = `${this.safeBaseName(file.originalname)}-${Date.now().toString(36)}`;
    const signature = this.signCloudinaryParams({ folder, public_id: publicId, timestamp }, apiSecret);
    const formData = new FormData();
    const bytes = new Uint8Array(file.buffer);
    const blob = new Blob([bytes], { type: file.mimetype || 'image/jpeg' });

    formData.append('file', blob, file.originalname);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('folder', folder);
    formData.append('public_id', publicId);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    const result = (await response.json()) as CloudinaryUploadResponse;

    if (!response.ok || !result.secure_url) {
      throw new BadRequestException(result.error?.message || 'Cloudinary avatar upload failed.');
    }

    return result.secure_url;
  }

  private signCloudinaryParams(params: Record<string, string>, apiSecret: string): string {
    const payload = Object.entries(params)
      .sort(([first], [second]) => first.localeCompare(second))
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    return createHash('sha1').update(`${payload}${apiSecret}`).digest('hex');
  }

  private safeBaseName(fileName: string): string {
    return fileName
      .replace(extname(fileName), '')
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'avatar';
  }
}
