// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT token from the header
      ignoreExpiration: false, // Ensure expiration is validated
      secretOrKey: process.env.JWT_SECRET, // Secret key used to verify the token
    });
  }

  // Extract user details from the JWT token payload
  async validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email };
  }
}
