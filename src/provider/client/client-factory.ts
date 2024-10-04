import { BaseClient, ParamsConnection } from './base-client';
import { Mongo } from './mongo';
import { Postgres } from './postgres';
export class ClientFactory {
    private static mongoClient: Mongo | null = null;  
    private static postgresClient: Postgres | null = null;
    getClient(type: 'mongo' | 'postgres', params?: ParamsConnection): BaseClient {
        switch(type) {
            case 'mongo':
                if (ClientFactory.mongoClient === null) {
                    if (params === undefined || params === null) {
                        throw new Error('Params are required for MongoDB');
                    }
                    ClientFactory.mongoClient = new Mongo();
                    ClientFactory.mongoClient.connection(params);
                }
                return ClientFactory.mongoClient;
            case 'postgres':
                if (ClientFactory.postgresClient === null) {
                    if (params === undefined || params === null) {
                        throw new Error('Params are required for MongoDB');
                    }
                    ClientFactory.postgresClient = new Postgres();
                    ClientFactory.postgresClient.connection(params);
                }
                return ClientFactory.postgresClient;
            default:
                throw new Error('Client not found');
        }
    }
}