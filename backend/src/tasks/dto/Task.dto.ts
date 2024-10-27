import { OmitType } from '@nestjs/mapped-types';

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

export class CreateTaskDto extends OmitType(TaskDto, ['id', 'status']) {}

export class GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
