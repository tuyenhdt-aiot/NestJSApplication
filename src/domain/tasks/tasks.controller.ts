import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Tasks } from './entitties/tasks.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageConfig } from 'src/config/file.config';
import { FileFiter } from 'src/config/file-filter.config';
import { FilterTaskDto } from './dto/filter-task.dto';
import { Roles } from '../auth/decorators/role.decorators';
import { Role } from '../auth/enum/user-role.enum';
import { RolesGuard } from '../auth/role.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @Roles(Role.ADMIN)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Tasks> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  getAllTask(@Query() query: FilterTaskDto) {
    return this.tasksService.getAllTask(query);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    const task = this.tasksService.getTaskById(Number(id));
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  // @Put(':id')
  // updateTask(@Param('id')id: string, @Body() updateTaskDto: UpdateTaskDto){
  //     return this.tasksService.updateTask(Number(id),updateTaskDto);
  // }

  @Delete(':id')
  @Roles(Role.ADMIN)
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(Number(id));
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: StorageConfig('file'),
      fileFilter: FileFiter,
    }),
  )
  uploadTask(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    return this.tasksService.updateTask(
      Number(id),
      updateTaskDto,
      file.destination + '/' + file.filename,
    );
  }

  @Post(':id/upload')
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: StorageConfig('file'),
      fileFilter: FileFiter,
    }),
  )
  async uploadFile(
    @Req() req: any,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const uploadFileTask = await this.tasksService.uploadFile(
      Number(id),
      file.destination + '/' + file.filename,
    );
    if (uploadFileTask) {
      return {
        message: 'Upload file successfully',
      };
    }
  }
}
