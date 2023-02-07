export interface User {
  id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export const USER_ROLES = Object.freeze(['admin', 'regular'] as const);
export type UserRole = (typeof USER_ROLES)[number];
