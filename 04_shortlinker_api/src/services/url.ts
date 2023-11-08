import {nanoid} from "nanoid";
import {ShortUrl} from "../models/shortUrl";
import {CustomError} from "../middlewares/errorHandler/errorHandler.types";

const BASE_URL = process.env.APP_DOMAIN;

//SOURCE: https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
const isUrl = (urlString: string) => {
    const URL_PATTERN = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
    return URL_PATTERN.test(urlString);
}

export const createShortUrl = async (originalURL: string) => {
    if (!isUrl(originalURL)) {
        const error: CustomError = new Error('Invalid URL');
        error.statusCode = 409;
        throw error;
    }

    const url = await ShortUrl.findOne({originalURL});
    if (url) {
        return `${BASE_URL}/${url.shortId}`;
    }

    const id = nanoid(10);
    await ShortUrl.create({
        shortId: id,
        originalURL
    });

    return `${BASE_URL}/${id}`;
}

export const findUrlByShortId = async (id: string) => {
    const result = await ShortUrl.findOne({shortId: id});
    if (!result) {
        const error: CustomError = new Error('URL not found');
        error.statusCode = 404;
        throw error;
    }
    return result.originalURL;
}
