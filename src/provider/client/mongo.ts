import { MongoClient } from 'mongodb';
import { BaseClient, ParamsConnection } from './base-client';

export class Mongo implements BaseClient {
    instance: MongoClient | null = null;
    connection(params: ParamsConnection): void {
        const { host, port, user, password, database } = params;
        console.log(`Connecting to MongoDB at ${host}:${port} with user ${user} and database ${database}`);
        const uri = `mongodb://${user}:${password}@${host}:${port}/${database}`;
        this.instance = new MongoClient(uri);
        try {
            this.instance.connect();
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error(`Error connecting to MongoDB: ${error}`);
        }
    }
    getInstance() {
        if (this.instance === null) {
            throw new Error('Instance is not connected to MongoDB');
        }
        return this.instance;
    }
    disconnection(): void {
        console.log('Disconnecting from MongoDB');
        this.instance?.close();
    }

}