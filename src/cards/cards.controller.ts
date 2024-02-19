import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';

//TODO: Add Validation Pipe to validate mongoIds and remove zaglushka from UserService :)

@Controller('cards')
@UseGuards(AuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto, @Req() req: any) {
    return this.cardsService.create(createCardDto, req.session.userId);
  }

  @Get()
  async findAll(@Req() req: any, @Query('columnId') columnId?: string) {
    return this.cardsService.findAll(req.session.userId, columnId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    return this.cardsService.findOne(id, req.session.userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
    @Req() req: any,
  ) {
    return this.cardsService.update(id, updateCardDto, req.session.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    return this.cardsService.remove(id, req.session.userId);
  }
}
