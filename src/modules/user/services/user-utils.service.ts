import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthUtilsService } from 'src/modules/auth/services/auth-utils.service';
import { UserUpdateRequest } from '../controllers/requests/user-update-request.dto';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user-repository';

@Injectable()
export class UserUtilsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authUtilsService: AuthUtilsService,
  ) {}

  async throwIfEmailAlreadyTaken(userId: string, updatedEmail: string) {
    const potentialExistingUser = await this.getUserById(userId);
    const hasEmailBeenUpdated = potentialExistingUser.email !== updatedEmail;
    if (hasEmailBeenUpdated) {
      await this.authUtilsService.throwIfEmailAlreadyTaken(updatedEmail);
    }
  }

  throwIfRequesterIsNotAllowedToUpdateRoles(
    requesterUser: User,
    userUpdateRequest: UserUpdateRequest,
  ) {
    const isRoleBeingUpdated = userUpdateRequest.role !== undefined;
    const isRequesterUserAdmin = requesterUser.role === 'admin';

    if (isRoleBeingUpdated && !isRequesterUserAdmin) {
      throw new ForbiddenException('Not allowed to update role');
    }
  }

  private async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.getUserById(userId);
    const doesUserExist = user !== null;

    if (!doesUserExist) {
      throw new NotFoundException(
        'There is no registered account under that id',
      );
    }

    return user;
  }
}
