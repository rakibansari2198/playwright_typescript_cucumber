import dotenv from "dotenv";
const env = process.env.TEST_ENV || "qa";

dotenv.config({path: 'src/env/' + env + '.env'});

export const DBConfig = {
    dbHost: process.env.DB_HOST,
    dbPort: Number(process.env.DB_PORT),
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME
};