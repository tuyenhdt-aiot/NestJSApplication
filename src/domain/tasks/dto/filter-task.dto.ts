import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

export class FilterTaskDto extends PaginationQueryDto {
  @ApiProperty({ example: 'DONE', enum: ['DONE', 'IN_PROGRESS', 'OPEN'] })
  @IsString()
  @IsOptional()
  status?: string;
}
