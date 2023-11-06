import {Router} from "express";
import {detectLocation} from "../controllers/detectLocation";

const routes = Router();

routes.get('/', detectLocation);

export default routes;
