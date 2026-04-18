import { IsString, Min, MinLength } from "class-validator";

export class CreateNichDto {
    @IsString()
    @MinLength(3)
    name: string

    @IsString()
    userId: string
}
