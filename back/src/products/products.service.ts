import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Variation } from './entities/variation.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateVariationDto } from './dto/create-variation.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Variation)
        private variationRepository: Repository<Variation>,
    ) {}

    async findAll(page: number = 1, limit: number = 20): Promise<Product[]> {
        return this.productRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            relations: ['variations'],
        });
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id }, relations: ['variations'] });
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        
        const existingProduct = await this.productRepository.findOne({ where: { name: createProductDto.name } });
        if (existingProduct) {
            throw new BadRequestException(`El producto '${createProductDto.name}' ya existe`);
        }

        const productData = { ...createProductDto, variations: [] };
        const product = this.productRepository.create(productData);
        const savedProduct = await this.productRepository.save(product);

        if (createProductDto.variations && createProductDto.variations.length > 0) {
            const variations = createProductDto.variations.map(variation =>
                this.variationRepository.create({
                    ...variation,
                    product: savedProduct,
                })
            );
            await this.variationRepository.save(variations);
            savedProduct.variations = variations;
        }

        return savedProduct;
    }

    async createVariation(productId: string, createVariationDto: CreateVariationDto): Promise<Variation> {
        const product = await this.findOne(productId);
        const variation = this.variationRepository.create({
            ...createVariationDto,
            product,
        });
        return this.variationRepository.save(variation);
    }

    async findAllVariations(productId: string): Promise<Variation[]> {
        const product = await this.findOne(productId);
        return product.variations;
    }

    async findOneVariation(variationId: string): Promise<Variation> {
        const variation = await this.variationRepository.findOne({ where: { id: variationId }, relations: ['product'] });
        if (!variation) throw new NotFoundException('Variation not found');
        return variation;
    }
}