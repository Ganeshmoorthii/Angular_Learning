export interface AuthToken {
  userId: string;
  username: string;
  issuedAt: number;
  expiresAt: number;
}

export interface DecodedToken {
  sub: string;
  username: string;
  roles: string[];
  exp: number;
  iat?: number;
}