export interface TokenPayload {
    userId: string;
}

export interface TokenService {
    generate(payload: TokenPayload): Promise<string>;

    verify(token: string): Promise<TokenPayload>;
}