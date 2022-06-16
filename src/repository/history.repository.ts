import { InsertResult, Repository } from 'typeorm';
import { IRepository } from './repository.interface';
import { History } from 'entity';
import AppDataSource from 'app/data-source';

const repository: Repository<History> = AppDataSource.getRepository(History);

export class HistoryRepository implements IRepository<History> {
  public async findAll(): Promise<History[]> {
    return repository.find();
  }

  public async insert(item: any): Promise<InsertResult> {
    const history = repository.create(item);
    return repository.insert(history);
  }
}