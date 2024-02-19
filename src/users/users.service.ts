import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../shared/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = new this.userModel({
      ...createUserDto,
      passwordHash: hashedPassword,
    });

    try {
      const savedUser = await createdUser.save();
      return { _id: savedUser._id, message: 'User created successfully' };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`The provided ID is not a valid ObjectId`);
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`The provided ID is not a valid ObjectId`);
    }

    const updateObject = updateUserDto.password
      ? {
          ...updateUserDto,
          passwordHash: await bcrypt.hash(updateUserDto.password, 10),
        }
      : updateUserDto;

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateObject, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User not found`);
    }
    return updatedUser;
  }

  async remove(id: string) {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return { message: 'User deleted successfully' };
  }
}
