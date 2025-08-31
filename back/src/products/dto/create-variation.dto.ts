import { IsString, IsNumber } from 'class-validator';

export class CreateVariationDto {
    @IsString()
    attribute: string; 

    @IsNumber()
    priceModifier: number; 
}