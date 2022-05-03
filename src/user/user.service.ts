import { User } from './user.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        name: 'Jacques',
      },
      {
        id: 2,
        name: 'Pierre',
      },
    ];
  }

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: number): User | undefined {
    return this.users.find((e) => e.id === id);
  }

  deleteUser(id: number): void {
    this.users = this.users.filter((e) => e.id !== id);
  }

  addUser(user: User): User {
    this.users.push(user);
    return user;
  }
}
