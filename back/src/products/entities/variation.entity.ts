import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Variation {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    attribute: string; 

    @Column('decimal')
    priceModifier: number; 

    @ManyToOne(() => Product, (product) => product.variations)
    product: Product;
}