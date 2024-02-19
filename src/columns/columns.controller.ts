import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  async create(@Req() req, @Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.create(createColumnDto, req.session.userId);
  }

  @Get()
  findAll(@Req() req) {
    return this.columnsService.findAll(req.session.userId);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.columnsService.findOne(id, req.session.userId);
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnsService.update(id, req.session.userId, updateColumnDto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.columnsService.remove(id, req.session.userId);
  }
}
