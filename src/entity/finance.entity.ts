import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseTimeEntity } from './base.entity';
import { Account } from './account.entity';

export enum Asset {
  ACTIVE = "active",
  PASSIVE = "passive"
}

@Entity()
export class Type extends BaseTimeEntity {
  @Column({unique: true})
  public name: string;

  @Column()
  public description: string;

  @Column({enum: Asset, default: null, nullable: true})
  asset: Asset
}

@Entity()
export class Finance extends BaseTimeEntity {
  @Column({type: "double"})
  public value: number;

  @ManyToOne(() => Type, (type) => type.name, {nullable: false, eager: true})
  public type: Type;

  @Column()
  public description: string;

  @ManyToOne(() => Account, (account) => account.name, {nullable: false, eager: true})
  public source: Account;

  @ManyToOne(() => Account, (account) => account.name, {eager: true})
  public destination: Account;

  @ManyToOne(() => Finance, (finance) => finance.id)
  public reference: Finance;

  @Column({nullable: true})
  public referenceId: number;
}