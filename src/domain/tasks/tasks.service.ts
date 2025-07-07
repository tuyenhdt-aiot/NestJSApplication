import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './entitties/tasks.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Tasks) private taskRepository: Repository<Tasks>
    ){}

    async createTask(createTaskDto: CreateTaskDto): Promise<Tasks>{
        return this.taskRepository.save(createTaskDto);
    }
}
