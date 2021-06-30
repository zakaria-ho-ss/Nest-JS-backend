import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { userMail } from './mail.models';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: userMail, token: string) {
    const url = `${process.env.BACK_URL}/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,

      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
