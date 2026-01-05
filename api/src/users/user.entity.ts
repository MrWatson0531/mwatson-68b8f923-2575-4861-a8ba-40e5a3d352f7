import {Entity,Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../auth/libs/auth/roles.enum';
import { Org } from '../orgs/org.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @Column({type: 'text'})
    role: string;

    @ManyToOne(() =>  Org, {nullable: false})
    organization: Org;
}