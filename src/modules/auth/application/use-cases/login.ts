import type { UserRepository } from '../../../users/application/repositories/user-repository.js';
import type { PasswordHasher } from '../../../users/application/services/password-hasher.js';
import type { User } from '../../../users/domain/user.js';

import { AppError } from '../../../../shared/errors/app-error.js';
import { ErrorCode } from '../../../../shared/errors/error-code.js';
// import {TokenService} from "../services/token-service.js";

interface LoginInput {
    email: string;
    password: string;
}

// interface LoginResult {
//     user: User;
//     accessToken: string;
// }

export class LoginUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
        // private readonly tokenService: TokenService,
    ) {}

    async execute(input: LoginInput): Promise<User> {
        const user = await this.userRepository.findByEmail(input.email);

        if (user === null) {
            throw new AppError(
                'Invalid email or password',
                ErrorCode.UNAUTHORIZED,
                401,
            );
        }

        if (!user.isActive) {
            throw new AppError(
                'Invalid email or password',
                ErrorCode.UNAUTHORIZED,
                401,
            );
        }

        const passwordMatches = await this.passwordHasher.compare(
            input.password,
            user.passwordHash,
        );

        if (!passwordMatches) {
            throw new AppError(
                'Invalid email or password',
                ErrorCode.UNAUTHORIZED,
                401,
            );
        }

        return user;
    }
}