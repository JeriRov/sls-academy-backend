import {Router} from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import {authenticate} from "../middlewares/authenticate/authenticate";

const routes = Router();

routes.use('/auth', authRoutes);
routes.use(authenticate, userRoutes);

export default routes;
