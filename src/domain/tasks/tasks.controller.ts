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
import { CustomRequest } from 'src/common/interface/custom-request.interface';
import { ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        statusCode: 201,
        message: 'Request successfully',
        data: {
          title: 'Title 4',
          description: 'description 4',
          status: 'OPEN',
          file: null,
          id: 8,
          created_at: '2025-07-11T01:44:35.204Z',
          updated_at: '2025-07-11T01:44:35.204Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    schema: {
      example: {
        message: 'Forbidden resource',
        error: 'Forbidden',
        statusCode: 403,
      },
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: {
        message: [
          'status must be one of the following values: OPEN, IN_PROGRESS, DONE',
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Tasks> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        statusCode: 200,
        message: 'Request successfully',
        data: {
          res: [
            {
              id: 6,
              title: 'Title 4',
              description: 'description 4',
              status: 'OPEN',
              file: '1752198260992-pexels-ufuk-gerekli-441801306-30372613.jpg',
            },
            {
              id: 8,
              title: 'Title 4',
              description: 'description 4',
              status: 'OPEN',
              file: null,
            },
          ],
          total: 2,
          page: 1,
          limit: 2,
        },
      },
    },
  })
  getAllTask(@Query() query: FilterTaskDto) {
    return this.tasksService.getAllTask(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        statusCode: 200,
        message: 'Request successfully',
        data: {
          id: 6,
          title: 'Title 4',
          description: 'description 4',
          status: 'OPEN',
          file: '1752198260992-pexels-ufuk-gerekli-441801306-30372613.jpg',
          created_at: '2025-07-11T01:43:57.354Z',
          updated_at: '2025-07-11T01:44:20.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    schema: {
      example: {
        message: 'Task with ID 1 not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  getUserById(@Param('id') id: string) {
    const task = this.tasksService.getTaskById(Number(id));
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiResponse({
    status: 404,
    schema: {
      example: {
        message: 'Task with ID 5 not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        statusCode: 200,
        message: 'Request successfully',
        data: null,
      },
    },
  })
  async deleteTask(@Param('id') id: string) {
    const deleteTask = await this.tasksService.deleteTask(Number(id));
    return null;
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: StorageConfig('file'),
      fileFilter: FileFiter,
    }),
  )
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        statusCode: 200,
        message: 'Request successfully',
        data: {
          id: 4,
          title: 'Test 1',
          description: 'Des 1',
          status: 'IN_PROGRESS',
          file: '1752198144761-pexels-ufuk-gerekli-441801306-30372613.jpg',
          created_at: '2025-07-11T01:37:25.283Z',
          updated_at: '2025-07-11T01:42:24.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: {
        message: 'Task with ID 41 not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  async uploadTask(
    @Req() req: CustomRequest,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    const updateTask = await this.tasksService.updateTask(
      Number(id),
      updateTaskDto,
      file.filename,
    );
    return updateTask;
  }

  @Post(':id/upload')
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: StorageConfig('file'),
      fileFilter: FileFiter,
    }),
  )
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        statusCode: 201,
        message: 'Request successfully',
        data: {
          id: 7,
          title: 'Title 4',
          description: 'description 4',
          status: 'OPEN',
          file: '1752201551053-pexels-ufuk-gerekli-441801306-30372613.jpg',
          created_at: '2025-07-11T01:43:58.162Z',
          updated_at: '2025-07-11T02:39:11.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: {
        message:
          'Wrong extension type. Accepted file ext are : .png,.jpg,.jpeg',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: {
        message: 'File is required',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: {
        message: 'Task with ID 41 not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  async uploadFile(
    @Req() req: CustomRequest,
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
      file.filename,
    );
    return uploadFileTask;
  }
}
