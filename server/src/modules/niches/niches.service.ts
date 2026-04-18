import { Injectable } from '@nestjs/common';
import { CreateNichDto } from './dto/create-nich.dto';
import { UpdateNichDto } from './dto/update-nich.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class NichesService {

  constructor(
    private readonly supabaseService: SupabaseService
  ) { }

  async create(newNiche: CreateNichDto) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from("niches")
      .insert(newNiche)
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
      message: "Haz creado un nicho exitosamente",
      data
    }
  }

  findAll() {
    return `This action returns all niches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nich`;
  }

  update(id: number, updateNichDto: UpdateNichDto) {
    return `This action updates a #${id} nich`;
  }

  remove(id: number) {
    return `This action removes a #${id} nich`;
  }

  async getAllByUser(userId: String) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from("niches")
      .select()
      .eq("userId", userId);

    if (error) throw error;
    return data;
  }

}
