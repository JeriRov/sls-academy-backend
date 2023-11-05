import {NextFunction, Request, Response} from "express";
import {ErrorResponse} from "./errorHandler.types";

export const errorHandler = (err: Error, _req: Request, res: Response<ErrorResponse>, _next: NextFunction) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        success: false,
        error: err.message,
    });
}
