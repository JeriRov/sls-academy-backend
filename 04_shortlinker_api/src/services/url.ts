import {nanoid} from "nanoid";

const BASE_URL = process.env.APP_DOMAIN;
export const createShortUrl = async () => {
    const id = nanoid(10);
}
