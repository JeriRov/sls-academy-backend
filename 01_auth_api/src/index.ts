import * as dotenv from 'dotenv';
import http from 'http';
import express from 'express';
import {checkDatabaseConnection} from "./db";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());

const start = async () => {
    try {
        await checkDatabaseConnection();
        server.listen(3000, () => {
            console.log('Server is listening on port http://localhost:3000');
        });
    } catch (error) {
        console.error(error);
    }
};

start();
