import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItem } from './entities/cart-item.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
    imports: [TypeOrmModule.forFeature([Cart, CartItem]),
        ProductsModule
    ], 
    controllers: [CartController],              
    providers: [CartService],                   
    exports: [CartService],                     
})
export class CartModule {}