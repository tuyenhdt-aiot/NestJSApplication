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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        statusCode: 201,
        message: 'Request successfully',
        data: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJteXBpZXR0MDVAZ21haWwuY29tIiwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzUyMTk5MDQ3LCJleHAiOjE3NTIyMDI2NDd9.-zfe8pVKaK7fjmZmEDrePXEukPHSANwjDg3PUOS1uuc',
          refresh_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJteXBpZXR0MDVAZ21haWwuY29tIiwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNzUyMTk5MDQ3LCJleHAiOjE3NTI4MDM4NDd9.6_eyDdtyX0nsnff-cHIKE3Ned5K0-SH9Zkdma2-g3lA',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    schema: {
      example: {
        message: 'Password is not correct',
        error: 'Unauthorized',
        StatusCode: 401,
      },
    },
  })
  @ApiResponse({
    status: 401,
    schema: {
      example: {
        message: 'Email is not exists',
        error: 'Unauthorized',
        StatusCode: 401,
      },
    },
  })
  async login(@Body() loginUserDto: loginUserDto) {
    const auth = await this.authService.login(loginUserDto);
    return auth;
  }

  @Post('register')
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        statusCode: 201,
        message: 'Request successfully',
        data: {
          email: 'mypiett02@gmail.com',
          name: 'TT',
          role: 'ADMIN',
          refresh_token: null,
          id: 4,
          created_at: '2025-07-11T02:15:13.655Z',
          updated_at: '2025-07-11T02:15:13.655Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: {
        message: 'Email already exists',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  async register(@Body() registerUserDto: registerUserDto) {
    const auth = await this.authService.register(registerUserDto);
    const { password, ...result } = auth;
    return result;
  }

  @Post('refresh-token')
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        statusCode: 201,
        message: 'Request successfully',
        data: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJteXBpZXR0MDVAZ21haWwuY29tIiwiaWF0IjoxNzUyMjAwODU3LCJleHAiOjE3NTIyMDQ0NTd9.XQUulZkuvjdZFpVjbPKpYzEg1YbmtXTwtB5KVZSAXAo',
          refresh_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJteXBpZXR0MDVAZ21haWwuY29tIiwiaWF0IjoxNzUyMjAwODU3LCJleHAiOjE3NTI4MDU2NTd9.Va5UHT_0UijNRb7tzGz0hr1dcO1bchSldkhHYYvTh9s',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: {
        message: 'Refresh token is not valid',
        error: 'Bad request',
        StatusCode: 400,
      },
    },
  })
  async refreshToken(@Body() { refresh_token }) {
    return await this.authService.refreshToken(refresh_token);
  }
}
