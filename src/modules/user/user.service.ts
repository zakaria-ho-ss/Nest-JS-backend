import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDTO, updateUserDTO, loginDTO } from './user.models';
import * as bcrypt from 'bcrypt';
import { MailService } from '../../services/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: userDTO) {
    const usersalt = await bcrypt.genSalt();
    const newUser = new this.userModel({
      name: createUserDto.name,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, usersalt),
      salt: usersalt,
    });
    const existedUser: any = await this.findOneByEmail(createUserDto.email);
    if (existedUser) {
      return {
        operation: {
          success: false,
          message: 'user already exists',
          data: { user: null },
        },
      };
    } else {
      const rest: any = newUser;
      const { password, email_verified, email, _id, ...rest1 } = rest._doc;

      const token = this.jwtService.sign({ ...rest1 });
      newUser.token = token;
      const result = await newUser.save();
      await this.mailService.sendUserConfirmation(
        { email: result.email, name: result.name },
        token,
      );

      return {
        operation: {
          success: true,
          message: 'user added successfully',
          data: { user: result },
        },
      };
    }
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    if (id.includes('@')) {
      return await this.findOneByEmail(id);
    } else {
      return await this.userModel.findById(id);
    }
  }

  async findOneByToken(token: string): Promise<User> {
    return await this.userModel.findOne({ token: token });
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async update(id: string, updateUserDto: updateUserDTO) {
    const updatedUser = await this.findOneByEmail(id);

    if (updateUserDto.email) {
      updatedUser.email = updateUserDto.email;
    }
    if (updateUserDto.name) {
      updatedUser.name = updateUserDto.name;
    }

    updatedUser.save();

    return updatedUser;
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }
}
