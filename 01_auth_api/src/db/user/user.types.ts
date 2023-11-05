export type User = {
    id: number;
    email: string;
    salt?: string;
    password: string;
}
export type UserWithoutPasswordAndSalt = Omit<User, 'password' | 'salt'>;
export type UserWithoutId = Omit<User, 'id'>;

export type AuthTokensWithId = {
    id: number;
    accessToken: string;
    refreshToken: string;
}
export type AuthTokens = Omit<AuthTokensWithId, 'id'>;
