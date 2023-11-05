import {NextFunction, Request, Response} from "express";
import {
    createUser,
    findUserByEmail,
    generateTokens,
    validateEmail,
    validatePassword,
    validateUser
} from "../../services/user";
import {AuthRequest, AuthResponse} from "./auth.types";
import {sendError} from "../../utils/sendError";

export const signUp = async (req: Request<{}, AuthResponse, AuthRequest>, res: Response<AuthResponse>, next: NextFunction) => {
    try {
        const {email, password} = req.body;

        if(!password || !email) {
            res.status(409);
            return sendError('Email and password are required');
        }

        if (await validateEmail(email)) {
            const error = await validateEmail(email);
            res.status(409);
            return sendError(error);
        }

        if(await findUserByEmail(email)) {
            res.status(409);
            return sendError('User already exists');
        }

        if (validatePassword(password)) {
            const error = validatePassword(password);
            res.status(409);
            return sendError(error);
        }

        const user = await createUser({email, password});

        const authData = generateTokens(user);

        res.status(201).json({
            success: true,
            data: authData,
        });
    } catch (error) {
        next(error);
    }
};

export const signIn = async (req: Request<{}, AuthResponse, AuthRequest>, res: Response<AuthResponse>, next: NextFunction) => {
    try {
        const {email, password} = req.body;

        if(!password || !email) {
            res.status(409);
            return sendError('Email and password are required');
        }

        if(await validateEmail(email)) {
            res.status(401);
            return sendError('Invalid email or password');
        }

        const user = await findUserByEmail(email);
        if (!user) {
            res.status(404);
            return sendError('User not found');
        }

        const isUserValid = await validateUser(user, password);
        if (!isUserValid) {
            res.status(401);
            return sendError('Invalid email or password');
        }

        const authData = generateTokens(user);
        res.status(200).json({
            success: true,
            data: authData,
        })
    } catch (error) {
        next(error);
    }
};
