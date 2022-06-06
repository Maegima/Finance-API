import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;
}

export abstract class BaseTimeEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({type: "datetime"})
  public created: string;

  @UpdateDateColumn({type: "datetime"})
  public updated: string;
}