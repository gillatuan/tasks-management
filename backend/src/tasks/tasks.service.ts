import {
  CreateTaskDto,
  GetTasksFilterDto,
  TaskDto,
  TaskStatus,
  UpdateTaskDto,
} from '@/tasks/dto/Task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: TaskDto[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string): TaskDto {
    const checkExistingItem = this.tasks.find((task) => task.id === id);
    if (!checkExistingItem) {
      throw new NotFoundException();
    }

    return checkExistingItem;
  }

  getTasksFilter(filterDto: GetTasksFilterDto) {
    let tasks = this.getAllTasks();

    if (filterDto.status) {
      tasks = this.tasks.filter((task) => task.status === filterDto.status);
    }

    if (filterDto.search) {
      tasks = this.tasks.filter((task) => {
        if (
          task.title.includes(filterDto.search) ||
          task.description.includes(filterDto.search)
        ) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  createTask(data: CreateTaskDto): TaskDto {
    const { title, description } = data;
    const task: TaskDto = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTaskStatus(id: string, updateTaskDto: UpdateTaskDto) {
    const found = this.getTaskById(id);
    found.status = updateTaskDto.status;

    return found;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }
}
