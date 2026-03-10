import { Role } from '../constants/roles.enum';

export type AuthUser = {
  id: string;
  email?: string;
  role: Role;
};
