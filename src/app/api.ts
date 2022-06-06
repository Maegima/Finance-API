import { Repository } from 'typeorm';
import AppDataSource from './data-source';
import { Finance, Type } from '../entity/finance.entity';

export class UsersRepository {
  
}

export const getFinances = (request: any, response: any) => {
    const repository: Repository<Finance> = AppDataSource.getRepository(Finance);
    repository.find()
        .then((finances) => response.status(200).json(finances))
        .catch((error) => response.status(500).json({ 'error': error }));
};

export const getTypes = (request: any, response: any) => {
    const repository: Repository<Type> = AppDataSource.getRepository(Type);
    repository.find()
        .then((types) => response.status(200).json(types))
        .catch((error) => response.status(500).json({ 'error': error }));
};