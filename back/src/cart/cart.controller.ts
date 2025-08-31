import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { v4 as uuidv4 } from 'uuid';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('add')
    addItem(@Body() addToCartDto: AddToCartDto) {
        return this.cartService.addItem(addToCartDto);
    }

    @Get(':id')
    getCart(@Param('id') id: string) {
        return this.cartService.getCart(id);
    }

    @Delete(':cartId/item/:itemId')
    removeItem(@Param('cartId') cartId: string, @Param('itemId') itemId: string) {
        return this.cartService.removeItem(cartId, itemId);
    }

    @Post('checkout/:id')
    checkout(@Param('id') cartId: string) {
        return this.cartService.checkout(cartId);
    }

    @Post('create')
    createCart() {
    const newCart = {
        id: uuidv4(),
        items: [],
    };
    return this.cartService.createCart(newCart);
    }
}