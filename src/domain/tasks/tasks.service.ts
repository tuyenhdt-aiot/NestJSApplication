import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './entitties/tasks.entity';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks) private taskRepository: Repository<Tasks>,
  ) {}

  async getAllTask(query: FilterTaskDto) {
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const where : any = {};
    if (query.status){
        where.status = Like('%' + query.status + '%');
    }
    const [res, total] = await this.taskRepository.findAndCount({
      where,
      order: { createdAt: 'ASC' },
      take: limit,
      skip: skip,
      select: ['id', 'title', 'description', 'status', 'file'],
    });
    return {
      res,
      total,
      page: page,
      limit: limit,
    };
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Tasks> {
    return await this.taskRepository.save(createTaskDto);
  }

  async getTaskById(id: number): Promise<Tasks> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
    file: string,
  ): Promise<UpdateResult> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return await this.taskRepository.update(id, { ...updateTaskDto, file });
  }

  async deleteTask(id: number): Promise<DeleteResult> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return await this.taskRepository.delete(id);
  }

  async uploadFile(id: number, file: string): Promise<boolean> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    const updateTask = await this.taskRepository.update(id, { file });
    return true;
  }
}
