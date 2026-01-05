import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Org } from '../orgs/org.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Org)
  org: Org;
}