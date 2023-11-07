import {Router} from "express";
import {createShortUrl} from "../controllers/url";

const routes = Router();

routes.get('/:shortId');
routes.post('/', createShortUrl);

export default routes;
