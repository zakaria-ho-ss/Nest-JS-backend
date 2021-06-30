import { Body, Controller, Get, Param, Query, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { user } from './appModels';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':name')
  getHello(
    @Param('name') name,
    @Query('lname') prenom,
    @Body() body: user,
  ): string {
    return this.appService.getHello(name, prenom, body);
  }
}
