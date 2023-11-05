import {NextFunction, Request, Response} from "express";
import {createUser, validateEmail, validatePassword} from "../../services/user";
import {User} from "../../db/user/user.types";
import {AuthResponse} from "./auth.types";
import {sendError} from "../../utils/sendError";

export const signUp = async (req: Request<{}, AuthResponse, User>, res: Response<AuthResponse>, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        if (await validateEmail(email)) {
            const error = await validateEmail(email);
            res.status(409);
            sendError(error);
        }

        if (validatePassword(password)) {
            const error = validatePassword(password);
            res.status(409);
            sendError(error);
        }

        const authData = await createUser({email, password});

        res.status(201).json({
            success: true,
            data: authData,
        });
    } catch (error) {
        next(error);
    }
}
