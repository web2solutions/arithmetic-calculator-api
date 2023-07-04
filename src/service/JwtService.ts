/* eslint-disable @typescript-eslint/no-explicit-any */
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

export interface IJwtService {
  decodeToken(token: string): JwtPayload | null;
  generateToken(user: Record<any, any>): string;
}

export class JwtService {
  private secret: string;
  public expiresIn: number;

  constructor(secret?: string) {
    this.secret = secret || (process.env.TOKEN_KEY || '');
    this.expiresIn = 60 * 60; // one hour ( 60 * 60 )
  }

  public decodeToken(token: string): JwtPayload | null {
    // eslint-disable-next-line no-console
    // console.log('+++++++  decodeToken() SECRET', this.secret);
    let valid = null;
    try {
      valid = jwt.verify(token, this.secret, { }) as JwtPayload;
    } catch (error) {
      valid = null;
    }
    return valid;
  }

  public generateToken(user: Record<any, any>): string {
    const token = jwt.sign(
      { user_id: user.id, username: user.username, admin: user.admin },
      this.secret,
      { expiresIn: this.expiresIn },
    );
    return token;
  }
}
