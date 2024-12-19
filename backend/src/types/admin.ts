export interface CreateUserDto {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
  usergroup_id?: string;
  site_id?: string;
}

export interface ImportUsersDto {
  file: Express.Multer.File;
}