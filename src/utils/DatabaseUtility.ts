import mysql from "mysql2/promise";
import { config } from "../config/config";

export class DatabaseUtility {

    private connection: mysql.Connection | null = null;

    async connect(): Promise<void> {
        this.connection = await mysql.createConnection({
            host: config.dbHost,
            port: Number(config.dbPort),
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbName
        });

        console.log("Database connected successfully");
    }

    async executeQuery(query: string,values: any[] = []): Promise<any[]> {

        if (!this.connection) {
            throw new Error("Database connection is not established");
        }

        const [rows] = await this.connection.execute(
            query,
            values
        );

        return rows as any[];
    }

    async closeConnection(): Promise<void> {

        if (this.connection) {

            await this.connection.end();

            this.connection = null;

            console.log("Database connection closed");
        }
    }
}