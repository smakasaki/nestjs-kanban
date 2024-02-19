import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://rootuser:rootpass@localhost:27017', {
      dbName: 'kanban',
    }),
    UsersModule,
    AuthModule,
    ColumnsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
