import { Client } from "pg";
import { config } from "../config/config";

export class DatabaseUtility {

    private connection: Client | null = null;

    async connect(): Promise<void> {

        this.connection = new Client({
            host: config.dbHost,
            port: Number(config.dbPort),
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbName
        });

        await this.connection.connect();

        console.log("Database connected successfully");
    }

    async executeQuery(
        query: string,
        values: any[] = []
    ): Promise<any[]> {

        if (!this.connection) {
            throw new Error("Database connection is not established");
        }

        const result = await this.connection.query(
            query,
            values
        );

        return result.rows;
    }

    async closeConnection(): Promise<void> {

        if (this.connection) {

            await this.connection.end();

            this.connection = null;

            console.log("Database connection closed");
        }
    }
}