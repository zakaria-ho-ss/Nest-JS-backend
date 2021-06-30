import { Injectable } from '@nestjs/common';
import { loginDTO } from '../user/user.models';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  login = async (loginDto: loginDTO) => {
    const user: any = await this.userService.findOne(loginDto.email);
    if (user) {
      if ((await bcrypt.hash(loginDto.password, user.salt)) === user.password) {
        const { salt, _id, __v, email_verified, ...rest } = user._doc;
        return {
          access_token: this.jwtService.sign(rest),
        };
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
  };

  confirm = async (token: string) => {
    const user: any = await this.userService.findOneByToken(token);

    if (user) {
      if (user._doc.token === token) {
        if (user._doc.email_verified) {
          return {
            operation: {
              success: true,
              message: 'Email already verified',
              data: { user: null },
            },
          };
        }
        user.email_verified = true;
        user.save();

        const { password, token, salt, ...rest } = user._doc;
        return {
          operation: {
            success: true,
            message: 'Email has been verified successfully',
            data: { user: rest },
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
  };
}
