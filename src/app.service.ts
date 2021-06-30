import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(name, lname, body): string {
    return (
      'Hello ' + name + ' ' + lname + ' nsib ' + body.lname + ' ' + body.fname
    );
  }
}
