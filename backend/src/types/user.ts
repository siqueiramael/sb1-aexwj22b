export interface UpdateProfileDto {
  name?: string;
  email?: string;
  phone?: string;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}