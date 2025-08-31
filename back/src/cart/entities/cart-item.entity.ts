import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from '../../products/entities/product.entity';
import { Variation } from '../../products/entities/variation.entity';

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Cart, (cart) => cart.items)
    cart: Cart;

    @ManyToOne(() => Product)
    product: Product;

    @ManyToOne(() => Variation, { nullable: true })
    variation: Variation | null;

    @Column('decimal')
    quantity: number;

    @Column('decimal', { nullable: true })
    measurement: number | null; 

    @Column('decimal', { nullable: true })
    requiredMeasurement: number | null; 

    @Column('decimal')
    price: number;
}