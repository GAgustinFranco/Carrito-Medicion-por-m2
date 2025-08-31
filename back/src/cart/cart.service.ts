import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { ProductsService } from '../products/products.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Variation } from '../products/entities/variation.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart) private cartRepository: Repository<Cart>,
        @InjectRepository(CartItem) private cartItemRepository: Repository<CartItem>,
        private productsService: ProductsService,
    ) {}

    async addItem(dto: AddToCartDto): Promise<Cart> {
        let cart = await this.cartRepository.findOne({ where: { id: dto.cartId }, relations: ['items'] });
        if (!cart) {
        cart = this.cartRepository.create({ id: dto.cartId, items: [] });
        await this.cartRepository.save(cart);
        }

        const product = await this.productsService.findOne(dto.productId);
        if (!product) throw new NotFoundException('Producto no encontrado');

        let measurement: number | null = null;
        let requiredMeasurement: number | null = null;
        let quantity = Number(dto.quantity) || 1;

        if (product.unit === 'm2') {
        if (!dto.width || !dto.height) throw new NotFoundException('Debe especificar ancho y alto');
        measurement = Number(dto.width) * Number(dto.height);
        const waste = Number(dto.waste ?? 10);
        requiredMeasurement = measurement * (1 + waste / 100);
        if (!product.packArea) throw new NotFoundException('Producto por m² requiere packArea');
        quantity = Math.ceil(requiredMeasurement / product.packArea);
        } else if (product.unit === 'm') {
        if (!dto.length) throw new NotFoundException('Debe especificar largo');
        measurement = Number(dto.length);
        const waste = Number(dto.waste ?? 10);
        requiredMeasurement = measurement * (1 + waste / 100);
        if (product.packArea) quantity = Math.ceil(requiredMeasurement / product.packArea);
        }

        let pricePerUnit = Number(product.basePrice) || 1;
        let variation: Variation | undefined = undefined;
        if (dto.variationId) {
        const foundVariation = await this.productsService.findOneVariation(dto.variationId);
        if (!foundVariation) throw new NotFoundException('Variación no encontrada');
        if (foundVariation.product.id !== product.id) throw new NotFoundException('Variación no pertenece al producto');
        variation = foundVariation;
        pricePerUnit += Number(foundVariation.priceModifier) || 0;
        }

        let price = Number((pricePerUnit * (product.packArea ? product.packArea * quantity : quantity)).toFixed(2)) || 1;

        const item = this.cartItemRepository.create({
        cart,
        product,
        variation,
        quantity,
        measurement,
        requiredMeasurement,
        price,
        });

        await this.cartItemRepository.save(item);
        return this.getCart(dto.cartId);
    }

    async getCart(id: string): Promise<Cart> {
        const cart = await this.cartRepository.findOne({
        where: { id },
        relations: ['items', 'items.product', 'items.variation'],
        });
        if (!cart) throw new NotFoundException('Carrito no encontrado');
        return cart;
    }

    async removeItem(cartId: string, itemId: string): Promise<Cart> {
        const item = await this.cartItemRepository.findOne({ where: { id: itemId }, relations: ['cart'] });
        if (!item || item.cart.id !== cartId) throw new NotFoundException('Producto no encontrado en el carrito');
        await this.cartItemRepository.remove(item);
        return this.getCart(cartId);
    }

    async checkout(cartId: string) {
        const cart = await this.getCart(cartId);
        if (!cart || cart.items.length === 0) throw new NotFoundException('Carrito no encontrado o vacío');

        const items = cart.items.map(i => ({
        product: { id: i.product.id, name: i.product.name, unit: i.product.unit },
        variation: i.variation ? { id: i.variation.id, attribute: i.variation.attribute } : null,
        quantity: Number(i.quantity) || 1,
        measurement: Number(i.measurement) || null,
        requiredMeasurement: Number(i.requiredMeasurement) || null,
        price: Number(i.price) || 1, // Convierte a número, fallback a 1
        }));

        const total = items.reduce((sum, item) => sum + item.price, 0);

        return { total: Number(total.toFixed(2)), items };
    }

    async createCart(newCart: { id: string; items: any[] }) {
        const cart = this.cartRepository.create(newCart);
        return this.cartRepository.save(cart);
    }
}