import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column({ nullable: true })
    userId: number;  

    @OneToMany(() => CartItem, (item) => item.cart)
    items: CartItem[];
}