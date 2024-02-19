import { Injectable, UseGuards } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Column } from './schemas/column.schema';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Injectable()
@UseGuards(AuthGuard)
export class ColumnsService {
  constructor(@InjectModel('column') private columnModel: Model<Column>) {}

  async create(createColumnDto: CreateColumnDto, userId: string) {
    const newColumn = new this.columnModel({
      ...createColumnDto,
      userId,
    });
    return await newColumn.save();
  }

  async findAll(userId: string) {
    return await this.columnModel.find({ userId }).exec();
  }

  async findOne(id: string, userId: string) {
    return await this.columnModel.findOne({ _id: id, userId }).exec();
  }

  async update(id: string, userId: string, updateColumnDto: UpdateColumnDto) {
    return await this.columnModel
      .findOneAndUpdate({ _id: id, userId }, updateColumnDto, { new: true })
      .exec();
  }

  async remove(id: string, userId: string) {
    return await this.columnModel.findOneAndDelete({ _id: id, userId }).exec();
  }
}
