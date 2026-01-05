import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SUPER_SECRET_KEY', // same as AuthModule
    });
  }

  async validate(payload: any) {
    // Attach user info to request
    return { id: payload.sub, role: payload.role, orgId: payload.orgId };
  }
}