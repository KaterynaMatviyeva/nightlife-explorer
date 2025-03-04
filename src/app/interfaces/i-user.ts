import { iEvent } from './i-event';

export enum Role {
  ORGANIZER = 'ROLE_ORGANIZER',
  USER = 'ROLE_USER',
}

export interface iUser {
  id: number;
  username: string;
  email: string;
  password: string;
  role: Role;
  // savedEvents?: iEvent[];
}
