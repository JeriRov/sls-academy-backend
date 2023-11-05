import {AuthTokensWithId} from "../../db/user/user.types";

export type AuthResponse = {
    success: boolean;
    data: AuthTokensWithId;
}
