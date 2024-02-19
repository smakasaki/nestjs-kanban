import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card } from './schemas/card.schema';

@Injectable()
export class CardsService {
  constructor(@InjectModel('cards') private cardModel: Model<Card>) {}
  async create(createCardDto: CreateCardDto, userId: string): Promise<Card> {
    const newCard = new this.cardModel({ ...createCardDto, userId });
    return await newCard.save();
  }

  async findAll(userId: string, columnId?: string): Promise<Card[]> {
    const query = { userId };
    if (columnId) {
      query['columnId'] = columnId;
    }
    return await this.cardModel.find(query).exec();
  }

  async findOne(id: string, userId: string): Promise<Card> {
    const card = await this.cardModel.findOne({ _id: id, userId });
    if (!card) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }
    return card;
  }

  async update(
    id: string,
    updateCardDto: UpdateCardDto,
    userId: string,
  ): Promise<Card> {
    const updatedCard = await this.cardModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: updateCardDto },
      { new: true },
    );
    if (!updatedCard) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }
    return updatedCard;
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.cardModel.deleteOne({ _id: id, userId });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Card with ID "${id}" not found`);
    }
  }
}
