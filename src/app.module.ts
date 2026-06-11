import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { DatabaseService } from './database.service';
import { ListeningController } from './listening/listening.controller';
import { ListeningService } from './listening/listening.service';

@Module({
  imports: [],
  controllers: [AppController, ListeningController, AuthController],
  providers: [DatabaseService, ListeningService, AuthService],
})
export class AppModule {}
