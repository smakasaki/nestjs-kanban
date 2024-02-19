import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../shared/schemas/user.schema';
import { ColumnsModule } from 'src/columns/columns.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    ColumnsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
