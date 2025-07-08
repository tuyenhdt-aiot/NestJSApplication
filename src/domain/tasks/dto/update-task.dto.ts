import { IsIn, IsString } from 'class-validator';
import { TaskStatus } from '../enum/task-status.enum';

export class UpdateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: string;
}
