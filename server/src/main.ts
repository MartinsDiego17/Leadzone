import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: (origin, callback) => {
      const allowed = [
        'http://localhost:3000',
      ];  

      const isVercel = origin?.endsWith('.vercel.app');

      if (!origin || allowed.includes(origin) || isVercel) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
