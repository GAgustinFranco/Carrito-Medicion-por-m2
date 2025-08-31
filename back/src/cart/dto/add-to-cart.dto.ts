import { IsString, IsNumber, IsOptional, IsNotEmpty, ValidateIf } from 'class-validator';

export class AddToCartDto {
    @IsString()
    @IsNotEmpty()
    cartId: string;

    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsString()
    @IsOptional()
    variationId?: string;

    @ValidateIf(o => o.unit === 'm2')
    @IsNumber()
    @IsNotEmpty()
    width?: number;

    @ValidateIf(o => o.unit === 'm2')
    @IsNumber()
    @IsNotEmpty()
    height?: number;

    @ValidateIf(o => o.unit === 'm')
    @IsNumber()
    @IsNotEmpty()
    length?: number;

    @IsNumber()
    @IsOptional()
    waste?: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    @IsOptional()
    unit?: string; 
}