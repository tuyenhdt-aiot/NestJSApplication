import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class loginUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is not empty' })
  @IsString()
  password: string;
}
