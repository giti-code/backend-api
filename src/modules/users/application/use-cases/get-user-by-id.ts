import { UserRepository } from '../repositories/user-repository.js';
import { User } from '../../domain/user.js';
import { ApplicationError } from '../../../../shared/errors/application-error.js';
import { ErrorCode } from '../../../../shared/errors/error-code.js';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (user === null) {
      throw new ApplicationError('User not found', ErrorCode.USER_NOT_FOUND, {
        fields: 'id',
      });
    }

    return user;
  }
}
