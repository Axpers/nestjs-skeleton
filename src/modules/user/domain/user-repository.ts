import { UserLoginDto } from '../controllers/requests/user-login.dto';
import { User } from './user';

export abstract class UserRepository {
  abstract getUsers(): Promise<User[]>;

  abstract getUserById(id: string): Promise<User | null>;

  abstract getUserByName(name: string): Promise<User | null>;

  abstract deleteUser(id: string): Promise<void>;

  // TODO Modifier l'objet pour que ça match le save
  abstract saveUser(userLoginDto: UserLoginDto): Promise<void>;
}
