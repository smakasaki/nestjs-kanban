import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as connectMongo from 'connect-mongodb-session';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  // Настройка хранилища для сессий
  const MongoDBStore = connectMongo(session);
  const store = new MongoDBStore({
    uri: 'mongodb://rootuser:rootpass@localhost:27017',
    databaseName: 'kanban',
    collection: 'sessions',
  });

  store.on('error', function (error) {
    console.error(error);
  });

  app.use(
    session({
      secret: 'kanbanan',
      resave: false,
      saveUninitialized: true,
      store: store,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24h
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
