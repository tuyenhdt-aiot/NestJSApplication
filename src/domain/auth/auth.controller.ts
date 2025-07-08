import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { registerUserDto } from './dto/register-user.dto';
import { loginUserDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginUserDto: loginUserDto) {
    const auth = await this.authService.login(loginUserDto);
    return {
      message: 'Login successfully',
      data: auth,
    };
  }

  @Post('register')
  async register(@Body() registerUserDto: registerUserDto) {
    const auth = await this.authService.register(registerUserDto);
    return {
      message: 'Register successfully',
    };
  }

  @Post('refresh-token')
  async refreshToken(@Body() { refresh_token }) {
    return await this.authService.refreshToken(refresh_token);
  }
}
