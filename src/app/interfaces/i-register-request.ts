import { Role } from './i-user';

export interface iRegisterRequest {
  username: string;
  email: string;
  password: string;
  role?: Role;
}
