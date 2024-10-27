import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = ['1', '2'];

  getAllTasks() {
    return this.tasks;
  }
}
