import {Request, Response, NextFunction} from 'express';

export const createShortUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {url} = req.body;
        res.json({
            success: true,
        });
    } catch (error) {
        next(error);
    }
}
