import { IsString, IsEmail, IsOptional, IsNotEmpty, IsIn, MinLength, IsUrl } from 'class-validator'

const LEAD_STATUSES = ["nuevo", "contactado", "interesado"] as const

export class CreateLeadsDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  address?: string

  @IsUrl()
  @IsOptional()
  website?: string

  @IsIn(LEAD_STATUSES)
  status: typeof LEAD_STATUSES[number]

  @IsString()
  @IsNotEmpty()
  nicheId: string

  @IsString()
  @IsNotEmpty()
  zoneId: string

  @IsString()
  @IsNotEmpty()
  userId: string
}