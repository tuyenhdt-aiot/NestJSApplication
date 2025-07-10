import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './entitties/tasks.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskStatus } from './enum/task-status.enum';
import { getPaginationParam } from 'src/common/pagination/pagination';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks) private taskRepository: Repository<Tasks>,
  ) {}

  async getAllTask(query: FilterTaskDto) {
    const { skip, take, page, limit } = getPaginationParam(
      Number(query.page),
      Number(query.limit),
    );
    const where: FindOptionsWhere<Tasks> = {};
    if (query.status) {
      where.status = query.status as TaskStatus;
    }
    const [res, total] = await this.taskRepository.findAndCount({
      where,
      order: { created_at: 'ASC' },
      take,
      skip,
      select: ['id', 'title', 'description', 'status', 'file'],
    });

    return {
      res,
      total,
      page,
      limit,
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
  ): Promise<Tasks> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    const updateTask = await this.taskRepository.update(id, {
      ...updateTaskDto,
      file,
    });
    return this.getTaskById(id);
  }

  async deleteTask(id: number): Promise<boolean> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    const deleteTask = await this.taskRepository.delete(id);
    return true;
  }

  async uploadFile(id: number, file: string): Promise<Tasks> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    const updateFile = await this.taskRepository.update(id, { file });
    return this.getTaskById(id);
  }
}
