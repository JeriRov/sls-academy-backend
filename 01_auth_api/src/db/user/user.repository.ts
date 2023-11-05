import {User, UserWithoutId, UserWithoutPasswordAndSalt} from "./user.types";
import {QueryConfig} from "pg";
import * as db from '../../db/index';

export const saveUser = async (user: UserWithoutId): Promise<User> => {
    const query: QueryConfig = {
        name: 'save-user',
        text: 'INSERT INTO users(email, salt, password) VALUES($1, $2, $3) RETURNING *',
        values: [user.email, user.salt, user.password],
    }
    const result = await db.query<User>(query);

    if (!result.rows[0]) {
        throw new Error('User not saved');
    }

    return result.rows[0];
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const query: QueryConfig = {
        name: 'get-user-by-email',
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email],
    }
    const result = await db.query<User>(query);

    return result.rows[0] || null;
}
