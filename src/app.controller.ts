import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  index(@Res() response: Response) {
    return response.sendFile(join(__dirname, 'public', 'index.html'));
  }

  @Get('admin')
  admin(@Res() response: Response) {
    return response.sendFile(join(__dirname, 'public', 'admin.html'));
  }
}
