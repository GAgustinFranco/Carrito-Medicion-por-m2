import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Variation } from './variation.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column('decimal')
    basePrice: number; 

    @Column()
    unit: string; 

    @Column({ default: false })
    isVariable: boolean;

    @Column('simple-array', { nullable: true })
    images: string[];

    @Column('decimal', { nullable: true })
    packArea: number | null; 

    @OneToMany(() => Variation, (variation) => variation.product)
    variations: Variation[];
}