import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Variation } from './entities/variation.entity';
import { productsSeed } from './seeder/products.seed';

@Injectable()
export class ProductsSeeder {
    constructor(
        private productsService: ProductsService,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Variation)
        private variationRepository: Repository<Variation>,
    ) {}

    async run() {
        
        await this.productRepository.query('TRUNCATE TABLE "cart_item" CASCADE');
        await this.variationRepository.query('TRUNCATE TABLE "variation" CASCADE');
        await this.productRepository.query('TRUNCATE TABLE "product" CASCADE');

        const results: { name: string; status: string; error?: string }[] = [];
        for (const product of productsSeed) {
            try {
                await this.productsService.create(product);
                results.push({ name: product.name, status: 'success' });
            } catch (error: any) {
                results.push({ name: product.name, status: 'failed', error: error.message || 'Error desconocido' });
            }
        }
        console.log('Seeder: Resultados de carga de productos:', results);
        return results;
    }
}