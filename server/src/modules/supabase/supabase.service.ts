import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private readonly client: SupabaseClient;

    constructor(private configService: ConfigService) {
        this.client = createClient(
            this.configService.get<string>('config.supabase_url')!,
            this.configService.get<string>('config.supabase_api_key')!,
        );
    }

    getClient(): SupabaseClient {
        return this.client;
    }
}
