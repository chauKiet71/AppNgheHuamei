import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { loadLocalEnv } from './env';
import { resolvePublicPath } from './public-path';

loadLocalEnv();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api', {
    exclude: ['/', '/admin'],
  });
  const publicPath = resolvePublicPath();
  app.useStaticAssets(publicPath);
  app.setBaseViewsDir(publicPath);

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

void bootstrap();
