import {Request, Response, NextFunction} from 'express';
import * as ShortUrl from "../services/url";
import {sendError} from "../utils/sendError";

export const createShortUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {url} = req.body;
        if (!url) {
            res.status(400);
            return sendError('URL is required');
        }
        const resultUrl = await ShortUrl.createShortUrl(url)
        res.json({
            success: true,
            shortUrl: resultUrl
        });
    } catch (error) {
        next(error);
    }
}

export const getShortUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {shortId} = req.params;
        const originalURL = await ShortUrl.findUrlByShortId(shortId);
        res.redirect(originalURL);
    } catch (error) {
        next(error);
    }
}
