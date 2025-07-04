import { IsString, IsInt } from "class-validator";
export class registerDto{
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