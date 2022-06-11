import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Type, Asset } from 'entity';

export default class FinanceTypeSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository = dataSource.getRepository(Type);
        await repository.insert([
            {
                name: 'PAYMENT',
                description: 'Money income.',
                asset: Asset.ACTIVE
            },
            {
                name: 'DEPOSIT',
                description: 'Money received from deposit.',
                asset: Asset.ACTIVE
            },
            {
                name: 'INCOME',
                description: 'Money revenue.',
                asset: Asset.ACTIVE
            },
            {
                name: 'SPENT',
                description: 'Money spent.',
                asset: Asset.PASSIVE
            },
            {
                name: 'ACCOUNT',
                description: 'General expense account (creditcard, internet, etc.).',
                asset: Asset.PASSIVE
            },
            {
                name: 'IMPOST',
                description: 'Impost.',
                asset: Asset.PASSIVE
            },
            {
                name: 'CONVERT',
                description: 'Convert digital money to physical.',
                asset: Asset.PASSIVE
            },
            {
                name: 'TRANSFER',
                description: 'Money transfered between accounts.'
            },
            {
                name: 'DELAYED',
                description: 'Spected expense.'
            },
            {
                name: 'RECOVER',
                description: 'Money recover.'
            }
        ]);
    }
}