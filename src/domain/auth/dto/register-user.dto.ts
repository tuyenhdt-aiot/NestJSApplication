import { IsEmail, IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '../enum/user-role.enum';
export class registerUserDto {
  @IsNotEmpty()
  @IsEmail({},{message: 'Invalid email format'})
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6,{message: 'Password must be at least 6 characters long'})
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsIn([Role.ADMIN,Role.USER])
  role: string;
}
