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
  login(@Body() loginUserDto: loginUserDto): Promise<any> {
    return this.authService.login(loginUserDto);
  }

  @Post('register')
  register(@Body() registerUserDto: registerUserDto) {
    this.authService.register(registerUserDto);
  }

  @Post('refresh-token')
  refreshToken(@Body() { refresh_token }): Promise<any> {
    return this.authService.refreshToken(refresh_token);
  }
}
