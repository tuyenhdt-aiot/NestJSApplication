import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({ example: 'page=1' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty({ example: 'limit=2' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
