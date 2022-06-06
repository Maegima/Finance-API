import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Account } from './account.entity';

@Entity()
export class History extends BaseEntity {
    @ManyToOne(() => Account, (account) => account.name, {nullable: false})
    public source: Account;
    
    @Column({type: "double", nullable: true})
    public earned: number;
    
    @Column({type: "double", nullable: true})
    public spent: number;
    
    @Column({type: "double", nullable: true})
    public current: number;

    @Column({type: "date"})
    public date: string;
}

