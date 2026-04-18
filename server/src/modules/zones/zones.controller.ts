import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';

@Controller('zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) { }

  @Post()
  async create(@Body() createZoneDto: CreateZoneDto) {
    const data = await this.zonesService.create(createZoneDto);
    return data;
  }

  @Get()
  findAll() {
    return this.zonesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zonesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zonesService.update(+id, updateZoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zonesService.remove(+id);
  }

  @Get("by-niche/:nicheId")
  async getByNiche(@Param("nicheId") nicheId: string, @Query("userId") userId: string) {
    const data = await this.zonesService.getByNiche({ nicheId, userId })
    return data;
  }
}
