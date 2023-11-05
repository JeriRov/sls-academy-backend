import {AuthTokensId} from "../../db/user/user.types";
import {Request} from "express";

export interface AuthenticatedRequest extends Request {
    token: AuthTokensId;
}
