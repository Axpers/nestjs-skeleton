import { ResourceResponse } from 'src/modules/resource/controllers/responses/resource-response.dto';
import { UserRole } from '../../domain/user';

export interface UserResponse {
  id: string;
  role: UserRole;
  resources: ResourceResponse[];
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
