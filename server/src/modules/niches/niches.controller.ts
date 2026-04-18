import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NichesService } from './niches.service';
import { CreateNichDto } from './dto/create-nich.dto';
import { UpdateNichDto } from './dto/update-nich.dto';

@Controller('niches')
export class NichesController {
  constructor(private readonly nichesService: NichesService) { }

  @Post()
  async create(@Body() createNichDto: CreateNichDto) {
    const response = await this.nichesService.create(createNichDto);
    const { success, status, message, data } = response;
    return {
      success,
      status,
      message,
      data
    };
  }

  @Get()
  findAll() {
    return this.nichesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nichesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNichDto: UpdateNichDto) {
    return this.nichesService.update(+id, updateNichDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nichesService.remove(+id);
  }
  @Get("by-user/:userId")
  async getAllByUser(@Param('userId') userId: String) {
    const data = await this.nichesService.getAllByUser(userId);
    return {
      data,
      status: 200
    };
  }
}
