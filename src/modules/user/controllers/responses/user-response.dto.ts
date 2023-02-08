import { UserRole } from '../../domain/user';

export interface UserResponse {
  id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
