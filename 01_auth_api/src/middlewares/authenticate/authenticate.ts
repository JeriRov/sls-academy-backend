import {NextFunction, Request, Response} from "express";
import jwt, {Secret} from "jsonwebtoken";
import {sendError} from "../../utils/sendError";
import {AuthenticatedRequest} from "./authenticate.types";
import {AuthTokensId} from "../../db/user/user.types";

const JWT_SECRET = process.env.JWT_SECRET as Secret;
export const authenticate = (req: Request, res: Response, next: NextFunction) => {

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        res.status(401);
        return sendError('Token is not valid');
    }

    const token = authorizationHeader.split(' ')[1];

    try {
        (req as AuthenticatedRequest).token = (jwt.verify(token, JWT_SECRET) as AuthTokensId);
        next();
    } catch (error) {
        res.status(401);
        return sendError('Token is not valid');
    }
};
