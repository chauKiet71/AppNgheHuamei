import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseService } from './database.service';
import { ListeningController } from './listening/listening.controller';
import { ListeningService } from './listening/listening.service';

@Module({
  imports: [],
  controllers: [AppController, ListeningController],
  providers: [DatabaseService, ListeningService],
})
export class AppModule {}
