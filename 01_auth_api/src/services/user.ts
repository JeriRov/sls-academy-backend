import {AuthTokens, AuthTokensWithId, User, UserWithoutId} from "../db/user/user.types";
import * as userRepository from '../db/user/user.repository';
import bcrypt from 'bcrypt';
import jwt, {Secret} from 'jsonwebtoken';

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET as Secret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string || '1h';

export const createUser = async (user: UserWithoutId): Promise<AuthTokensWithId> => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const savedUser = await userRepository.saveUser({
        ...user,
        salt,
        password: hashedPassword,
    });

    const {accessToken, refreshToken} = await generateTokens(savedUser);

    return {
        id: savedUser.id,
        accessToken: accessToken,
        refreshToken: refreshToken,
    }
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
    return await userRepository.getUserByEmail(email);
}

const generateTokens = async (user: User): Promise<AuthTokens> => {
    const accessToken = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
    const refreshToken = jwt.sign({id: user.id}, JWT_SECRET);

    return {
        accessToken,
        refreshToken,
    }
}

export const validateEmail = async (email: string) => {
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!email.toLowerCase().match(EMAIL_REGEX)) {
        return  'Invalid email';
    }
    const user = await getUserByEmail(email);
    if(user) {
        return `User ${email} already exists`;
    }

    return '';
};

export const validatePassword = (password: string) => {
    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    if (!password.match(PASSWORD_REGEX)) {
        return 'Password must contain at least one letter and one number';
    }

    return '';
}
