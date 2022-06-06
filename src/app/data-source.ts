import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
//import { Application } from './app';
import * as dotenv from 'dotenv';
import { SeederOptions } from 'typeorm-extension';

dotenv.config();

var database = process.env.database ? process.env.database : ""

const options: DataSourceOptions & SeederOptions = {
    type: "sqlite",
    database: database,
    entities: ["src/entity/**/*{.ts,.js}"],
    migrations: ["src/migration/**/*{.ts,.js}"],
    seeds: ["src/seeder/**/*{.ts,.js}"],
    factories: ["src/factory/**/*{.ts,.js}"],
    subscribers: [],
    synchronize: true,
    logging: false
};

const AppDataSource = new DataSource(options);
AppDataSource.initialize();
// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
export default AppDataSource;