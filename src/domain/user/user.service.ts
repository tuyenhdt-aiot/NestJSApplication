import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UserService {
    private readonly users: User[]=[];
    
    async findUserByUsername(username:string): Promise<User|undefined>{
        return this.users.find((user)=> user.username===username);
    }

}
