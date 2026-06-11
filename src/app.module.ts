import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { DatabaseService } from './database.service';
import { LearningHistoryController } from './learning-history/learning-history.controller';
import { LearningHistoryService } from './learning-history/learning-history.service';
import { ListeningController } from './listening/listening.controller';
import { ListeningService } from './listening/listening.service';

@Module({
  imports: [],
  controllers: [AppController, ListeningController, AuthController, LearningHistoryController],
  providers: [DatabaseService, ListeningService, AuthService, LearningHistoryService],
})
export class AppModule {}
