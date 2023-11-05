import {AuthTokensWithId} from "../../db/user/user.types";

export type AuthResponse = {
    success: boolean;
    data: AuthTokensWithId;
}

export type AuthRequest = {
    email?: string;
    password?: string;
}
