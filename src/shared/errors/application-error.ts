export class ApplicationError extends Error {
    public readonly code: string;

    constructor(message: string, code: string) {
        super(message);

        this.name = 'ApplicationError';
        this.code = code;

        Error.captureStackTrace(this, this.constructor);
    }
}