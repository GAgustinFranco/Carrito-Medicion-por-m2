import { IsString, IsNumber, IsBoolean, IsOptional, IsArray } from 'class-validator';
import { CreateVariationDto } from './create-variation.dto';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    basePrice: number;

    @IsString()
    unit: string;

    @IsBoolean()
    isVariable: boolean;

    @IsNumber()
    @IsOptional()
    packArea?: number;

    @IsArray()
    @IsString({ each: true })
    images: string[];

    @IsArray()
    @IsOptional()
    variations: CreateVariationDto[];
}