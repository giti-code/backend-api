export interface TokenPayload {
    userId: string;
}

export interface TokenService {
    generate(payload: TokenPayload): string;
}