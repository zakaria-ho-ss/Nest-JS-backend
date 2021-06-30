import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { updateUserDTO, userDTO } from './user.models';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: userDTO) {
    return this.userService.create(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Request() req) {
    return this.userService.findOne(req.user.email);
  }
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Request() req, @Body() updateUserDto: updateUserDTO) {
    return this.userService.update(req.user.email, updateUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Request() req) {
    return this.userService.remove(req.user.email);
  }
}
