import { UserCreateUpdateRequest } from '../controllers/requests/user-create-update-request.dto';
import { User } from './user';

export abstract class UserRepository {
  abstract getUsers(): Promise<User[]>;

  abstract getUserById(id: string): Promise<User | null>;

  abstract getUserByEmail(mail: string): Promise<User | null>;

  abstract deleteUser(id: string): Promise<void>;

  abstract createUser(
    userCreateRequest: UserCreateUpdateRequest,
  ): Promise<void>;
}
