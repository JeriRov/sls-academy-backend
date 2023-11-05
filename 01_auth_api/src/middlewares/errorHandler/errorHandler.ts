import {Request, Response, NextFunction} from "express";
import {ErrorResponse} from "./errorHandler.types";

export const errorHandler = (err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        success: false,
        error: err.message,
    });
}
