export type ErrorResponse = {
    success: boolean;
    error: string;
}
export interface CustomError extends Error {
    statusCode?: number;
}
