import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class loginUserDto {
  @ApiProperty({ example: 'mypiett04@gmail.com' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: 'Password is not empty' })
  @IsString()
  password: string;
}
