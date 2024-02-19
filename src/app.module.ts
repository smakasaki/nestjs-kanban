import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://rootuser:rootpass@localhost:27017', {
      dbName: 'kanban',
    }),
    UsersModule,
    AuthModule,
    ColumnsModule,
    CardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
