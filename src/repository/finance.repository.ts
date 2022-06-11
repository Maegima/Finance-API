import { Repository } from 'typeorm';
import { IRepository } from './repository.interface';
import { Finance, Type } from 'entity';
import AppDataSource from 'app/data-source';

export class FinancesRepository implements IRepository<Finance> {
  public async findAll(): Promise<Finance[]> {
    const repository: Repository<Finance> = AppDataSource.getRepository(Finance);
    return repository.find();
  }
}

export class TypesRepository implements IRepository<Type> {
  public async findAll(): Promise<Type[]> {
    const repository: Repository<Type> = AppDataSource.getRepository(Type);
    return repository.find();
  }
}