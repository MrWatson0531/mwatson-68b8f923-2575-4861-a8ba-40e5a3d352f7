import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';

@Entity()
export class Org {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Org, org => org.children, {nullable: true})
    parent?: Org;

    @OneToMany(() => Org, org => org.parent)
    children?: Org[];
}