export type User = {
    id: number;
    email: string;
    password: string;
}
export type UserWithoutId = Omit<User, 'id'>;

export type AuthTokensWithId = {
    id: number;
    accessToken: string;
    refreshToken: string;
}

export type AuthTokensId = Pick<AuthTokensWithId, 'id'>;
