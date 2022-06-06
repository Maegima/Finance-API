import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseTimeEntity } from './base.entity';

@Entity()
export class Account extends BaseTimeEntity {
  @Column({unique: true})
  public name: string;

  @Column()
  public description: string;
}