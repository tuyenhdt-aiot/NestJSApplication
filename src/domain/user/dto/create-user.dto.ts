import { IsString, IsInt } from 'class-validator';
export class CreateUserDto{
    @IsInt()
    id: number;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsInt()
    age: number;

    @IsString()
    role: string;
}