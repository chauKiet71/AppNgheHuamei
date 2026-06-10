import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createHash } from 'crypto';
import { memoryStorage, MulterFile } from 'multer';
import { extname } from 'path';
import { ListeningService } from './listening.service';
import { ListeningTrack } from './listening.types';

type CloudinaryUploadResponse = {
  secure_url?: string;
  public_id?: string;
  original_filename?: string;
  error?: { message?: string };
};

@Controller('listening')
export class ListeningController {
  constructor(private readonly listeningService: ListeningService) {}

  @Get('topics')
  getTopics() {
    return this.listeningService.getTopics();
  }

  @Get('topics/:topicId')
  getTopic(@Param('topicId') topicId: string) {
    return this.listeningService.getTopic(topicId);
  }

  @Get('topics/:topicId/sections/:sectionId')
  getSection(@Param('topicId') topicId: string, @Param('sectionId') sectionId: string) {
    return this.listeningService.getSection(topicId, sectionId);
  }

  @Get('topics/:topicId/sections/:sectionId/lessons/:lessonId')
  getLesson(
    @Param('topicId') topicId: string,
    @Param('sectionId') sectionId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.listeningService.getLesson(topicId, sectionId, lessonId);
  }

  @Post('topics')
  createTopic(@Body() body: Record<string, unknown>) {
    return this.listeningService.createTopic(body);
  }

  @Patch('topics/:topicId')
  updateTopic(@Param('topicId') topicId: string, @Body() body: Record<string, unknown>) {
    return this.listeningService.updateTopic(topicId, body);
  }

  @Delete('topics/:topicId')
  deleteTopic(@Param('topicId') topicId: string) {
    return this.listeningService.deleteTopic(topicId);
  }

  @Get('topics/:topicId/levels/:levelId')
  getLevel(@Param('topicId') topicId: string, @Param('levelId') levelId: string) {
    return this.listeningService.getLevel(topicId, levelId);
  }

  @Post('topics/:topicId/levels')
  createLevel(@Param('topicId') topicId: string, @Body() body: Record<string, unknown>) {
    return this.listeningService.createLevel(topicId, body);
  }

  @Patch('topics/:topicId/levels/:levelId')
  updateLevel(
    @Param('topicId') topicId: string,
    @Param('levelId') levelId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.listeningService.updateLevel(topicId, levelId, body);
  }

  @Delete('topics/:topicId/levels/:levelId')
  deleteLevel(@Param('topicId') topicId: string, @Param('levelId') levelId: string) {
    return this.listeningService.deleteLevel(topicId, levelId);
  }

  @Post('topics/:topicId/levels/:levelId/sections')
  createSectionInLevel(
    @Param('topicId') topicId: string,
    @Param('levelId') levelId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.listeningService.createSection(topicId, body, levelId);
  }

  @Post('topics/:topicId/sections')
  createSection(@Param('topicId') topicId: string, @Body() body: Record<string, unknown>) {
    return this.listeningService.createSection(topicId, body);
  }

  @Patch('topics/:topicId/sections/:sectionId')
  updateSection(
    @Param('topicId') topicId: string,
    @Param('sectionId') sectionId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.listeningService.updateSection(topicId, sectionId, body);
  }

  @Delete('topics/:topicId/sections/:sectionId')
  deleteSection(@Param('topicId') topicId: string, @Param('sectionId') sectionId: string) {
    return this.listeningService.deleteSection(topicId, sectionId);
  }

  @Post('topics/:topicId/sections/:sectionId/lessons')
  createLesson(
    @Param('topicId') topicId: string,
    @Param('sectionId') sectionId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.listeningService.createLesson(topicId, sectionId, body);
  }

  @Patch('topics/:topicId/sections/:sectionId/lessons/:lessonId')
  updateLesson(
    @Param('topicId') topicId: string,
    @Param('sectionId') sectionId: string,
    @Param('lessonId') lessonId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.listeningService.updateLesson(topicId, sectionId, lessonId, body);
  }

  @Delete('topics/:topicId/sections/:sectionId/lessons/:lessonId')
  deleteLesson(
    @Param('topicId') topicId: string,
    @Param('sectionId') sectionId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.listeningService.deleteLesson(topicId, sectionId, lessonId);
  }

  @Post('topics/:topicId/sections/:sectionId/lessons/:lessonId/questions')
  createTrack(
    @Param('topicId') topicId: string,
    @Param('sectionId') sectionId: string,
    @Param('lessonId') lessonId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.listeningService.createTrack(topicId, sectionId, lessonId, body);
  }

  @Patch('topics/:topicId/sections/:sectionId/lessons/:lessonId/questions/:trackId')
  updateTrack(
    @Param('topicId') topicId: string,
    @Param('sectionId') sectionId: string,
    @Param('lessonId') lessonId: string,
    @Param('trackId') trackId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.listeningService.updateTrack(topicId, sectionId, lessonId, trackId, body);
  }

  @Delete('topics/:topicId/sections/:sectionId/lessons/:lessonId/questions/:trackId')
  deleteTrack(
    @Param('topicId') topicId: string,
    @Param('sectionId') sectionId: string,
    @Param('lessonId') lessonId: string,
    @Param('trackId') trackId: string,
  ) {
    return this.listeningService.deleteTrack(topicId, sectionId, lessonId, trackId);
  }

  @Post('topics/:topicId/sections/:sectionId/lessons/:lessonId/questions/:trackId/audio')
  @UseInterceptors(
    FileInterceptor('audio', {
      storage: memoryStorage(),
      fileFilter: (_request, file, callback) => {
        const allowedExtensions = ['.mp3', '.mpeg', '.wav', '.m4a', '.webm', '.ogg', '.aac'];
        const extension = extname(file.originalname).toLowerCase();
        const isAudioMime = file.mimetype.startsWith('audio/');
        const isAllowedExtension = allowedExtensions.includes(extension);
        callback(null, isAudioMime || isAllowedExtension);
      },
      limits: {
        fileSize: 50 * 1024 * 1024,
      },
    }),
  )
  async uploadTrackAudio(
    @Param('topicId') topicId: string,
    @Param('sectionId') sectionId: string,
    @Param('lessonId') lessonId: string,
    @Param('trackId') trackId: string,
    @UploadedFile() file: MulterFile,
  ): Promise<ListeningTrack> {
    if (!file) {
      throw new BadRequestException('Audio file is required. Supported formats: mp3, wav, m4a, webm, ogg, aac.');
    }
    const audio = await this.uploadAudioToCloudinary(file);
    return this.listeningService.attachTrackAudio(topicId, sectionId, lessonId, trackId, audio);
  }

  private async uploadAudioToCloudinary(file: MulterFile): Promise<{ fileName: string; url: string }> {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      throw new BadRequestException(
        'Missing Cloudinary config. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.',
      );
    }

    const timestamp = Math.round(Date.now() / 1000).toString();
    const folder = process.env.CLOUDINARY_AUDIO_FOLDER || 'app-nghe-v1/audio';
    const publicId = `${this.safeBaseName(file.originalname)}-${Date.now().toString(36)}`;
    const signature = this.signCloudinaryParams({ folder, public_id: publicId, timestamp }, apiSecret);
    const formData = new FormData();
    const audioBytes = new Uint8Array(file.buffer);
    const audioBlob = new Blob([audioBytes], { type: file.mimetype || 'audio/mpeg' });

    formData.append('file', audioBlob, file.originalname);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('folder', folder);
    formData.append('public_id', publicId);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
      method: 'POST',
      body: formData,
    });
    const result = (await response.json()) as CloudinaryUploadResponse;

    if (!response.ok || !result.secure_url) {
      throw new BadRequestException(result.error?.message || 'Cloudinary upload failed.');
    }

    return {
      fileName: result.original_filename || file.originalname,
      url: result.secure_url,
    };
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
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 48) || 'audio';
  }
}
