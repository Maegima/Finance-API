import { Repository } from 'typeorm';
import { IRepository } from './repository.interface';
import { History } from 'entity';
import AppDataSource from 'app/data-source';

export class HistoryRepository implements IRepository<History> {
  public async findAll(): Promise<History[]> {
    const repository: Repository<History> = AppDataSource.getRepository(History);
    return repository.find();
  }
}