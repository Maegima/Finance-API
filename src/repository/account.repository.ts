import { Repository } from 'typeorm';
import { IRepository } from './repository.interface';
import { Account } from 'entity';
import AppDataSource from 'app/data-source';

export class AccountsRepository implements IRepository<Account> {
  public async findAll(): Promise<Account[]> {
    const repository: Repository<Account> = AppDataSource.getRepository(Account);
    return repository.find();
  }
}