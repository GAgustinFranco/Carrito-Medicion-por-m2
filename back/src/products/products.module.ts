import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { Variation } from './entities/variation.entity';
import { ProductsSeeder } from './products.seeder';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Variation])],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsSeeder],
    exports: [ProductsService]
})
export class ProductsModule {}