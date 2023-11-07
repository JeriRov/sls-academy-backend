import {Router} from "express";
import {editJson, getJson} from "../controllers/json";

const routes = Router();

routes.get('/:json_path', getJson);
routes.put('/:json_path', editJson);

export default routes;
