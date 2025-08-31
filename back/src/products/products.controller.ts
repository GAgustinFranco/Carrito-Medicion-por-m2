import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateVariationDto } from './dto/create-variation.dto';
import { ProductsSeeder } from './products.seeder';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly productsSeeder: ProductsSeeder
    ) {}

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get('variations/:variationId')
    findOneVariation(@Param('variationId') variationId: string) {
        
        return this.productsService.findOneVariation(variationId);
    }

    @Get(':id/variations')
    findAllVariations(@Param('id') productId: string) {
        
        return this.productsService.findAllVariations(productId);
    }

    @Post(':id/variations')
    createVariation(@Param('id') productId: string, @Body() createVariationDto: CreateVariationDto) {
        
        return this.productsService.createVariation(productId, createVariationDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        
        return this.productsService.findOne(id);
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Post('seeder')
    async runSeeder() {
        const results = await this.productsSeeder.run();
        return { message: 'Productos precargados', results };
    }
}