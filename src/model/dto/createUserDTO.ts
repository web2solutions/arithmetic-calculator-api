import { EUserStatus } from './EUserStatus';

export interface CreateUserDTO {
  username: string;
  password: string;
  status: EUserStatus;
  admin: boolean;
}
