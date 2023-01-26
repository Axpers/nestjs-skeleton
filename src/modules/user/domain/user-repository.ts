import { UserRegisterDto } from '../controllers/requests/user-register.dto';
import { User } from './user';

export abstract class UserRepository {
  abstract getUsers(): Promise<User[]>;

  abstract getUserById(id: string): Promise<User | null>;

  abstract getUserByEmail(mail: string): Promise<User | null>;

  abstract deleteUser(id: string): Promise<void>;

  abstract saveUser(userRegisterDto: UserRegisterDto): Promise<void>;
}
