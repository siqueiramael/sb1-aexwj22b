export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
}

export interface JwtPayload {
  id: number;
  role: string;
}