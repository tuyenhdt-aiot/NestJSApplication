import { IsEnum, IsString } from 'class-validator';
import { TaskStatus } from '../enum/task-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Title 1' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Description 1' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'DONE', enum: ['DONE', 'IN_PROGRESS', 'OPEN'] })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
