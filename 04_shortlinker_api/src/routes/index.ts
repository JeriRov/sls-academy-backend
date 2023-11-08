import {Router} from "express";
import {createShortUrl, getShortUrl} from "../controllers/url";

const routes = Router();

routes.get('/:shortId', getShortUrl);
routes.post('/', createShortUrl);

export default routes;
