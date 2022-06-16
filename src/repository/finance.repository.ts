import { InsertResult, Repository } from 'typeorm';
import { IRepository } from './repository.interface';
import { Finance, Type, Account } from 'entity';
import AppDataSource from 'app/data-source';

const financeRepository: Repository<Finance> = AppDataSource.getRepository(Finance);
const typeRepository: Repository<Type> = AppDataSource.getRepository(Type);

export class FinancesRepository implements IRepository<Finance> {
  public async findAll(): Promise<Finance[]> {
    return financeRepository.find();
  }
  public async insert(item: any): Promise<InsertResult> {
    var finance = financeRepository.create(item);
    return financeRepository.insert(finance);
  }
}

export class TypesRepository implements IRepository<Type> {
  public async findAll(): Promise<Type[]> {
    return typeRepository.find();
  }

  public async insert(item: any): Promise<InsertResult> {
    const type = typeRepository.create(item);
    return typeRepository.insert(type);
  }
}