import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadsDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) { }

  
@Patch("update-status")
async updateStatus(
  @Query("leadId") leadId: string,
  @Query("status") status: string,
) {
  const data = await this.leadsService.updateStatus(leadId, status)
  return data;
}

  @Post()
  create(@Body() createLeadDto: CreateLeadsDto) {
    return this.leadsService.create(createLeadDto);
  }

  @Get()
  async findAll() {
    return this.leadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadsService.update(+id, updateLeadDto);
  }

  @Delete('delete/:leadId')
  async remove(@Param('leadId') leadId: string) {
    const data = await this.leadsService.remove(leadId);
    return {
      data, 
      status: 200
    };
  }

  @Get("by-user/:userId")
  async getByUserAndNicheAndZone(
    @Param("userId") userId: string,
    @Query("nicheId") nicheId?: string,
    @Query("zoneId") zoneId?: string
  ) {
    const data = await this.leadsService.getByUserAndNicheAndZone(userId, nicheId, zoneId)
    return data;
  }

}
