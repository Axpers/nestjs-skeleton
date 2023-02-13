import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserUpdateRequest } from '../controllers/requests/user-update-request.dto';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user-repository';

@Injectable()
export class UserUtilsService {
  constructor(private readonly userRepository: UserRepository) {}

  async throwIfUserDoesNotAlreadyExist(userId: string) {
    const potentialExistingUser = await this.userRepository.getUserById(userId);
    const isIdAlreadyTaken = potentialExistingUser?.id === userId;
    if (!isIdAlreadyTaken) {
      throw new NotFoundException(
        'There is no registered account under that id',
      );
    }
  }

  throwIfRequesterIsNotAllowedToUpdateRoles(
    requesterUser: User,
    userUpdateRequest: UserUpdateRequest,
  ) {
    const isRoleUpdated = userUpdateRequest.role !== undefined;
    const isRequesterUser = requesterUser.role === 'admin';

    if (isRoleUpdated && !isRequesterUser) {
      throw new ForbiddenException('You are not allowed to update roles');
    }
  }
}
