import { OmitType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class TaskDto {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export class CreateTaskDto extends OmitType(TaskDto, ['id', 'status']) {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string
}
export class UpdateTaskDto extends OmitType(TaskDto, ['title', 'description']) {
  @IsNotEmpty()
  status: TaskStatus
}

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
