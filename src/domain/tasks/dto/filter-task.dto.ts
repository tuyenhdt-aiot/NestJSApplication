import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterTaskDto {
  @IsNumberString()
  @IsOptional()
  page?: number;

  @IsNumberString()
  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  status?: string;
}
