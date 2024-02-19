import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { ColumnSchema } from './schemas/column.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'column', schema: ColumnSchema }]),
  ],
  providers: [ColumnsService],
  controllers: [ColumnsController],
  exports: [ColumnsService],
})
export class ColumnsModule {}
