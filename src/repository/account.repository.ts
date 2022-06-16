import { InsertResult, Repository } from 'typeorm';
import { IRepository } from './repository.interface';
import { Account } from 'entity';
import AppDataSource from 'app/data-source';

const repository: Repository<Account> = AppDataSource.getRepository(Account);

export class AccountsRepository implements IRepository<Account> {
  public async findAll(): Promise<Account[]> {
    return repository.find();
  }

  public async insert(item: any): Promise<InsertResult> {
    const account = repository.create(item);
    return repository.insert(account);
  }
}