import dotenv from "dotenv";

dotenv.config({path: 'src/qa.env'});

export const config = {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,    
    dbUser: process.env.DB_USER,
};