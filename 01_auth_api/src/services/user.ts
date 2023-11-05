import {AuthTokensWithId, User, UserWithoutId} from "../db/user/user.types";
import * as userRepository from '../db/user/user.repository';
import bcrypt from 'bcrypt';
import jwt, {Secret} from 'jsonwebtoken';

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET as Secret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string || '1h';

export const createUser = async (user: UserWithoutId): Promise<User> => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    return await userRepository.saveUser({
        ...user,
        password: hashedPassword,
    });
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
    return await userRepository.findUserByEmail(email);
}

export const generateTokens = (user: User): AuthTokensWithId => {
    const accessToken = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
    const refreshToken = jwt.sign({id: user.id}, JWT_SECRET);

    return {
        id: user.id,
        accessToken,
        refreshToken,
    }
}

export const validateEmail = async (email: string) => {
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !RegExp(EMAIL_REGEX).exec(email.toLowerCase())) {
        return 'Invalid email';
    }

    return '';
};

export const validatePassword = (password: string) => {
    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (password && password.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    if (!RegExp(PASSWORD_REGEX).exec(password)) {
        return 'Password must contain at least one letter and one number';
    }


    return '';
}

export const validateUser = async (user: User, currentPassword: string) => {
    return await bcrypt.compare(currentPassword, user.password);
};
