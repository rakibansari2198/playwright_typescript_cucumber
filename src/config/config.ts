import dotenv from "dotenv";

const env = process.env.TEST_ENV || "qa";
dotenv.config({path: 'src/env/' + env + '.env'});

export const config = {
    baseUrl: process.env.BASE_URL!,
    loginPath: process.env.LOGIN_PATH!,
    registerPath: process.env.REGISTER_PATH!
};