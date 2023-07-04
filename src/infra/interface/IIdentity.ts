export interface UserToken {
  // eslint-disable-next-line camelcase
  user_id: string;
  username: string;
  admin: boolean;
  iat: number;
  exp: number;
}
export interface IIdentity {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: UserToken;
  token: string
}
