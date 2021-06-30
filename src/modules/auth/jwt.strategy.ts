import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// pour recuperer un variable d'environement
import * as dotenv from 'dotenv';
import { UserService } from '../user/user.service';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user: any = await this.userService.findOne(payload.email);
    if (user) {
      if (payload.password === user.password) {
        return user;
      } else {
        return {
          operation: {
            success: false,
            message: 'login failed',
            data: { user: null },
          },
        };
      }
    } else {
      return {
        operation: {
          success: false,
          message: 'user not exist',
          data: { user: null },
        },
      };
    }
  }
}
