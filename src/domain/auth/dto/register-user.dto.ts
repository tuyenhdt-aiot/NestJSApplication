import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../enum/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';
export class registerUserDto {
  @ApiProperty({ example: 'mypiett04@gmail.com' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({ example: 'Thanh Tuyen' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'ADMIN', enum: ['ADMIN', 'USER'] })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
