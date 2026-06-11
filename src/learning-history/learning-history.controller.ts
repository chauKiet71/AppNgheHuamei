import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateLearningHistoryInput } from './learning-history.types';
import { LearningHistoryService } from './learning-history.service';

@Controller('learning-history')
export class LearningHistoryController {
  constructor(
    private readonly authService: AuthService,
    private readonly learningHistoryService: LearningHistoryService,
  ) {}

  @Get()
  async list(@Headers('authorization') authorization?: string) {
    const user = await this.authService.requireUser(authorization);
    return this.learningHistoryService.list(user.id);
  }

  @Post()
  async create(@Headers('authorization') authorization: string | undefined, @Body() body: CreateLearningHistoryInput) {
    const user = await this.authService.requireUser(authorization);
    return this.learningHistoryService.create(user.id, body);
  }
}
