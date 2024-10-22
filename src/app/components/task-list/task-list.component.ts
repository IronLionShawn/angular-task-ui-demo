import { SortEvent, compareColumn } from './../../../types/table';
import { SortableTableHeaderDirective } from './../../directives/sortable-table-header.directive';
import { RestService } from './../../services/rest.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TaskObject } from './../../../types/models/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  public dataLoaded: boolean = false;

  // This property cannot be assigned so bang '!' is added instead of disabling strictPropertyInitialization tsconfig property
  @ViewChildren(SortableTableHeaderDirective) tableHeaders!: QueryList<SortableTableHeaderDirective>;

  public title: string = 'Task List';

  protected headers: { name: string, title: string }[] = [ 
    { name: 'id', title: '#' }, 
    { name: 'task', title: 'Task' }, 
    { name: 'description', title: 'Description' }, 
    { name: 'status', title: 'Status' }
  ];

  protected tasks: TaskObject[] = [];

  protected users = [];

  public sortedTasks: TaskObject[] = [];

  constructor(protected rest: RestService, protected router: Router) { }

  ngOnInit(): void {
    this.getTasks();
    this.sortedTasks = this.tasks;
  }

  /**
   * Api call, get all tasks from api
   */
  private getTasks(): void {
    // const url: string = 'http://localhost:8002/api/v1/task';
    const url: string = 'https://6323b7ebbb2321cba91e0f6b.mockapi.io/api/v1/task';
    this.rest.get<TaskObject[]>(url).subscribe(tasks => {
      this.tasks = tasks;
      this.sortedTasks = tasks;
      this.dataLoaded = true;
    });
  }

  /**
   * Redirect to the 
   * @param taskId - The id for the task
   */
  protected viewTask(taskId: number | ''): void {
    this.router.navigate([`/tasks/${taskId}`]);
  }

  /**
   * Sorts the task array
   * @param param0 
   */
  protected onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.tableHeaders.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting tasks
    if (direction === '' || column === '') {
      this.sortedTasks = this.tasks;
    } else {
      this.sortedTasks = [...this.sortedTasks].sort((a: TaskObject, b: TaskObject) => {
        const res = compareColumn(a[column as keyof TaskObject], b[column as keyof TaskObject]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  /**
   * Returns the calculated bootstrap column size based on size of array
   * @param size - size of array
   */
  protected columnSize (size: number): string {
    return `col-md-${Math.round(12 / size)}`;
  }
}
