import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadsModule } from './modules/leads/leads.module';
import { ConfigModule } from '@nestjs/config';
import configurationEnviroment from './config/configuration-enviroment';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { NichesModule } from './modules/niches/niches.module';
import { ZonesModule } from './modules/zones/zones.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './env/development.env',
      load: [configurationEnviroment],
    }), 
    LeadsModule,
    SupabaseModule,
    NichesModule,
    ZonesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
