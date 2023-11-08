import {NextFunction, Request, Response} from "express";
import {CustomError, ErrorResponse} from "./errorHandler.types";

export const errorHandler = (err: CustomError, _req: Request, res: Response<ErrorResponse>, _next: NextFunction) => {
    let statusCode = 500;

    if(res.statusCode !== 200) {
        statusCode = res.statusCode;
    }
    if(err.statusCode) {
        statusCode = err.statusCode;
    }

    res.status(statusCode);
    res.json({
        success: false,
        error: err.message,
    });
}
