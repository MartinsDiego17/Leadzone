import { PartialType } from '@nestjs/mapped-types';
import { CreateLeadsDto } from './create-lead.dto';

export class UpdateLeadDto extends PartialType(CreateLeadsDto) {}
