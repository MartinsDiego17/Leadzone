import { Injectable } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ZonesService {

  constructor(
    private readonly supabaseService: SupabaseService
  ) { }

  async create(newZone: CreateZoneDto) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from("zones")
      .insert(newZone)
      .select()
      .single()


    if (error) {
      return {
        success: false,
        status: 409,
        message: error.message,
        data: null
      }
    }

    return {
      success: true,
      status: 200,
      message: "Haz creado una zona exitosamente",
      data
    }
  }

  findAll() {
    return `This action returns all zones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zone`;
  }

  update(id: number, updateZoneDto: UpdateZoneDto) {
    return `This action updates a #${id} zone`;
  }

  remove(id: number) {
    return `This action removes a #${id} zone`;
  }

  async getByNiche({ nicheId, userId }: { nicheId: string, userId: string }) {

    if (nicheId === "all") {
      const { data, error } = await this.supabaseService
        .getClient()
        .from("zones")
        .select()
        .eq("userId", userId)

      if (error) throw error;

      return data;
    }

    const { data, error } = await this.supabaseService
      .getClient()
      .from("zones")
      .select()
      .eq("nicheId", nicheId)
      .eq("userId", userId)

    if (error) throw error;

    return data;
  }
}
