/* eslint-disable @typescript-eslint/no-explicit-any */
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

export interface IJwtService {
  decodeToken(token: string): JwtPayload | null;
  generateToken(user: Record<any, any>): string;
}

export class JwtService {
  private secret: string;
  private expiresIn: number;

  constructor(secret = '') {
    this.secret = secret;
    this.expiresIn = 60 * 60; // one hour
  }

  public decodeToken(token: string): JwtPayload | null {
    let valid = null;
    try {
      valid = jwt.verify(token, this.secret) as JwtPayload;
    } catch (error) {
      valid = null;
    }
    return valid;
  }

  public generateToken(user: Record<any, any>): string {
    const token = jwt.sign(
      { user_id: user.id, username: user.username },
      this.secret,
      { expiresIn: this.expiresIn },
    );
    return token;
  }
}
