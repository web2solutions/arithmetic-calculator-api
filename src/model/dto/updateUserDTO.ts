import { EUserStatus } from './EUserStatus';

export interface UpdateUserDTO {
  username?: string;
  password?: string;
  status?: EUserStatus;
}
