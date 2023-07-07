import { EUserStatus } from './EUserStatus';

export interface UpdateUserDTO {
  username?: string;
  password?: string;
  salt?: string;
  status?: EUserStatus;
  admin?: boolean;
  balance?: number;
  photo?: string;
}
