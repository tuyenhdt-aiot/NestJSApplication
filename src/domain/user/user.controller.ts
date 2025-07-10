import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        statusCode: 200,
        message: 'Request successfully',
        data: [
          {
            id: 3,
            email: 'mypiett03@gmail.com',
            name: 'TT',
            role: 'ADMIN',
          },
          {
            id: 4,
            email: 'mypiett02@gmail.com',
            name: 'TT',
            role: 'ADMIN',
          },
        ],
      },
    },
  })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
