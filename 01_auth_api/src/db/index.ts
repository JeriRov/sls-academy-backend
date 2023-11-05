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
        const result: QueryResult<{time: string}> = await pool.query('SELECT NOW() as time');
        const currentTime = result.rows[0].time;
        console.log('Database connected successfully. Current time:', currentTime);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const query = <T extends Object>(text: string | QueryConfig<QueryValues[]>, params?: QueryValues[]): Promise<QueryResult<T>> => {
    return pool.query<T>(text, params);
}
