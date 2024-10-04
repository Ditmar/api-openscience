import { BaseClient, ParamsConnection } from "./base-client";
import { Pool } from 'pg';
export class Postgres implements BaseClient {

    instance: Pool | null = null;
    getInstance(): Pool {
        if (this.instance === null) {
            throw new Error('Instance is not connected to Postgres');
        }
        return this.instance;
    }
    connection(params: ParamsConnection): void {
        const { host, port, user, password, database } = params;
        console.log(`Connecting to Postgres at ${host}:${port} with user ${user} and database ${database}`);
         this.instance = new Pool({
            host: host,
            port: port,
            user: user,
            password: password,
            database: database
        });
        this.instance.connect();
        console.log('Connected to Postgres');
    }
    disconnection(): void {
        this.instance?.end();
    }
}
