import { loginUserDto } from './dto/login-user.dto';
import { registerUserDto } from './dto/register-user.dto';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  private async generateToken(payload: { id: number; email: string }) {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('SECRET'),
      expiresIn: this.configService.get<string>('EXP_IN_REFRESH_TOKEN'),
    });
    await this.userRepository.update(
      { email: payload.email },
      { refresh_token: refresh_token },
    );

    return { access_token, refresh_token };
  }

  async register(registerUserDto: registerUserDto): Promise<User> {
    const checkExistEmail = await this.userRepository.findOne({
      where: { email: registerUserDto.email },
    });
    if (checkExistEmail) {
      throw new BadRequestException('Email already exists');
    }
    const hashPassword = await this.hashPassword(registerUserDto.password);
    return await this.userRepository.save({
      ...registerUserDto,
      password: hashPassword,
    });
  }

  async login(
    loginUserDto: loginUserDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new HttpException(
        {
          message: 'Email is not exists',
          error: 'Unauthorized',
          StatusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const checkPass = bcrypt.compareSync(loginUserDto.password, user.password);
    if (!checkPass) {
      throw new HttpException(
        {
          message: 'Password is not correct',
          error: 'Unauthorized',
          StatusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = { id: user.id, email: user.email, roles: [user.role] };
    return this.generateToken(payload);
  }

  async refreshToken(
    refresh_token: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const verify = await this.jwtService.verifyAsync(refresh_token, {
        secret: this.configService.get<string>('SECRET'),
      });
      const checkExistToken = await this.userRepository.findOneBy({
        email: verify.email,
        refresh_token: refresh_token,
      });
      if (checkExistToken) {
        return this.generateToken({ id: verify.id, email: verify.email });
      } else {
        throw new HttpException(
          {
            message: 'Refresh token is not valid',
            error: 'Bad request',
            StatusCode: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'Refresh token is not valid',
          error: 'Bad request',
          StatusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
