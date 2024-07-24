import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDto } from '../user/dto/auth-login.dto';
import { AuthRegisterDto } from '../user/dto/auth-register.dto';
import { AuthForgetPasswordDto } from '../user/dto/auth-forget-password.dto';
import { AuthResetPasswordDto } from '../user/dto/auth-reset-password.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDto){
    return this.authService.login(email, password)
  }

  @Post('register')
  async create(@Body() body: AuthRegisterDto){
    return this.authService.register(body);
  }

  @Post('forgetPassword')
  async forgetPassward(@Body() { email }: AuthForgetPasswordDto){
    return this.authService.forgotPassword(email)
  }

  @Post('resetPassword')
  async resetPassword(@Body() {password, token}: AuthResetPasswordDto){
    return this.authService.resetPassword(password, token)
  }
}