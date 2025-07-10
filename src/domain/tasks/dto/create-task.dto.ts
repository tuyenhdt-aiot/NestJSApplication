import { IsEnum, IsIn, IsString } from 'class-validator';
import { TaskStatus } from '../enum/task-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Title 1' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Description 1' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'DONE', enum: ['OPEN', 'IN_PROGRESS', 'DONE'] })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
