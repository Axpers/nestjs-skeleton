import { UserCreateRequest } from 'src/modules/auth/controllers/requests/user-create-request.dto';
import { UserUpdateRequest } from '../controllers/requests/user-update-request.dto';
import { User } from './user';

export abstract class UserRepository {
  abstract getUsers(): Promise<User[]>;

  abstract getUserById(id: string): Promise<User | null>;

  abstract getUserByEmail(mail: string): Promise<User | null>;

  abstract deleteUser(id: string): Promise<void>;

  abstract createUser(userCreateRequest: UserCreateRequest): Promise<void>;

  abstract updateUser(
    userId: string,
    userUpdateRequest: UserUpdateRequest,
  ): Promise<void>;
}
