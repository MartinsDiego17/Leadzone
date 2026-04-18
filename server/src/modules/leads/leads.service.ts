import { Injectable } from '@nestjs/common';
import { CreateLeadsDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class LeadsService {

  constructor(
    private readonly supabaseService: SupabaseService
  ) { }

  async updateStatus(leadId: string, status: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from("leads")
      .update({ status })
      .eq("id", leadId);

    return {
      leadId,
      statusLead: status,
      status: 200
    };
  }

  async create(createLeadsDto: CreateLeadsDto) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from("leads")
      .insert(createLeadsDto)
      .select()

    if (error) throw (error.message)

    return data
  }

  async findAll() {
    const { data, error } = await this.supabaseService
      .getClient()
      .from("leads")
      .select("*")
  }

  findOne(id: number) {
    return `This action returns a #${id} lead`;
  }

  update(id: number, updateLeadDto: UpdateLeadDto) {
    return `This action updates a #${id} lead`;
  }

  async remove(leadId: string) {

    const { data, error } = await this.supabaseService
      .getClient()
      .from("leads")
      .delete()
      .eq("id", leadId);

    if (error) throw error;


    return data;
  }

  async getByUserAndNicheAndZone(userId: string, nicheId?: string, zoneId?: string) {

    if (!nicheId && !zoneId) {
      const { data, error } = await this.supabaseService
        .getClient()
        .from("leads")
        .select()
        .eq("userId", userId)

      if (error) throw Error;

      return data;
    }

    const { data, error } = await this.supabaseService
      .getClient()
      .from("leads")
      .select()
      .eq("userId", userId)
      .eq("nicheId", nicheId)
      .eq("zoneId", zoneId)

    if (error) throw Error;

    return data;
  }

}
