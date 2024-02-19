import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CardSchema } from './schemas/card.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'cards', schema: CardSchema }])],
  providers: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {}
