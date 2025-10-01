export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super-admin',
}

export interface User {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  role: UserRoles;
  profileImageUrl?: string;
}

export interface AuthUser {
  id: string;
  role: string;
}

export interface UserInput {
  username: string;
  firstname: string;
  lastname: string;
  role: UserRoles;
  profileImageUrl?: string;
}
