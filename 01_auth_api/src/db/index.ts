import * as dotenv from 'dotenv';
import {Pool, QueryConfig, QueryResult} from 'pg'
import {QueryValues} from "./index.types";

dotenv.config();

const pool = new Pool();

pool.on('error', (err: Error) => {
    console.error('Database connection error:', err);
});

export const checkDatabaseConnection = async (): Promise<void> => {
    try {
        const result: QueryResult = await pool.query('SELECT NOW() as currentTime');
        const currentTime = result.rows[0].currenttime;
        console.log('Database connected successfully. Current time:', currentTime);
    } catch (error) {
        throw error;
    }
}

export const query = (text: string | QueryConfig<QueryValues[]>, params?: QueryValues[]) => {
    return pool.query(text, params)
}
