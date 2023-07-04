import { EUserStatus } from './EUserStatus';

export interface CreateUserDTO {
  _id?: string,
  username: string;
  password: string;
  status: EUserStatus;
  admin?: boolean;
  balance?: number;
}
