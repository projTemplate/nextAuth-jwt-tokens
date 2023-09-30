export interface User {
    name?: string | null | undefined;
    email?: string | null | undefined;
    role?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
}
