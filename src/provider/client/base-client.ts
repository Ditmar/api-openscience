import { MongoClient } from 'mongodb';
import { Pool } from 'pg';

export interface ParamsConnection{
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}
export interface BaseClient {
    connection(params: ParamsConnection): void;
    disconnection(): void;
    getInstance(): MongoClient | Pool;
}