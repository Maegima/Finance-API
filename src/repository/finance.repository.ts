import { Repository } from 'typeorm';
import { IRepository } from './repository.interface';
import { Finance } from 'entity';
import AppDataSource from 'app/data-source';

export class UsersRepository implements IRepository<Finance> {
  public async findAll(): Promise<Finance[]> {
    const repository: Repository<Finance> = AppDataSource.getRepository(Finance);
    return repository.find();
  }
}