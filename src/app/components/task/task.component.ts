import { Modal } from './../../../types/modal';
import { ModalComponent } from './../modal/modal.component';
import { RestService } from './../../services/rest.service';
import { TaskObject, TaskRequest } from './../../../types/models/task';
import { CrudRouteType } from './../../../types/crud';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const validateStatus = function(control: FormControl) {
  if(!isNaN(control?.value)) {
    if(control.value > -1 && control.value < 2) {
      return {
        statusValid: true
      }; 
    }
  }
  return null;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  public title: string = `Task`;

  // protected url: string = 'http://localhost:8002/api/v1/task';

  protected url: string = 'https://6323b7ebbb2321cba91e0f6b.mockapi.io/api/v1/task';

  protected id?: number;

  public dataLoaded: boolean = false;

  protected task: TaskObject = {
    id: '',
    task: '',
    description: '',
    status: ''
  };

  protected taskForm = this.fb.group({
    id: [{ value: this.task.id, disabled: true }],
    task: [{value: this.task.task, disabled: true }, Validators.required],
    description: [{ value: this.task.description, disabled: true }, Validators.required],
    status: [{ value: this.task.status, disabled: true  }, [Validators.required]]
  });

  type: CrudRouteType = "read";

  constructor(protected activatedRoute: ActivatedRoute, protected fb: FormBuilder, protected modalService: NgbModal, protected router: Router, protected rest: RestService) { }

  ngOnInit(): void {
    const snapshot = this.activatedRoute.snapshot;
    this.type = snapshot.data['type'];
    this.id = (snapshot.params['id']) ? snapshot.params['id'] : undefined;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    if(snapshot.data['type'] !== 'read') {
      this.makeFormEditable(snapshot.data['type']);
    } else {
      this.getTask();
    }
  }

  /**
   * Makes the form editable using reactive form controls, 
   * also disables spinner or gets the current task using the api
   * @param type - The type for the form
   */
  protected makeFormEditable(type: string): void {
    this.taskForm.controls.task.enable();
    this.taskForm.controls.description.enable();
    this.taskForm.controls.status.enable();
    if(type === 'create') {
      this.dataLoaded = true;
    } else {
      this.getTask();
    }
  }

  /**
   * Takes a task object and patches it into the reactive form
   * @param TaskObject - The task to be patched
   */
  protected patchTask(TaskObject: TaskObject): void {
    const { id, task, description, status } = TaskObject;
    if((id as number) > -1) {
      this.taskForm.patchValue({
        id,
        task,
        description,
        status
      });
    }
  }

  /**
   * Api call, gets task by id
   * shows error modal if something went wrong
   */
  protected getTask() {
    this.rest.get<TaskObject>(`${this.url}/${this.id}`).subscribe(
      task => {
        this.patchTask(task);
        this.dataLoaded = true;
      },
      error => {
        this.goBack();
      }
    );
  }

  /**
   * Routes to edit page based on current task id
   */
  protected editTask() {
    this.router.navigate([`/tasks/${this.id}/edit`])
  }

  /**
   * Api call, updates task using put, data gotten from reactive form, checks if form is valid first
   * shows error modal if something went wrong
   */
  protected updateTask() {
    if(!this.taskForm.invalid) {
      const task: string = (this.taskForm.get('task')!.value as string);
      const description: string = (this.taskForm.get('description')!.value as string);
      const status: number = (this.taskForm.get('status')!.value as number);
      const taskToUpdate: TaskRequest = {
        task: task,
        description: description,
        status: status
      };
      console.log('update task');
      this.rest.put(`${this.url}/${this.id}`,taskToUpdate).subscribe(
        response => {
          console.log('response');
          this.goBack();
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  /**
   * Api call, creates new task, data gotten from reactive form, checks if form is valid first
   * shows error modal if something went wrong
   */
  protected createTask() {
    if(!this.taskForm.invalid) {
      const task: string = (this.taskForm.get('task')!.value as string);
      const description: string = (this.taskForm.get('description')!.value as string);
      const status: number = (this.taskForm.get('status')!.value as number);
      const newTask: TaskRequest = {
        task: task,
        description: description,
        status: status
      };

      this.rest.post<TaskObject>(this.url,newTask).subscribe(
        task => {
          this.router.navigateByUrl(`/tasks/${task.id}`);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  /**
   * Api call, deletes task, 
   * shows modal to confirm before deletion
   */
  protected deleteTask() {
    const modalData: Modal = {
      title: 'Confirm',
      content: '<p>Are you sure you want to delete this record?</p>',
    }
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = modalData.title;
    modalRef.componentInstance.content = modalData.content;
    modalRef.result.then((result) => {
      this.rest.delete(`${this.url}/${this.id}`).subscribe(
        response => {
          this.router.navigateByUrl('/tasks');
        },
        error => {
          console.error(error);
        }
      );
    });
  }

  /**
   * Go back a page
   */
  protected goBack(): void {
    if(this.type === 'update') {
      this.router.navigateByUrl(`/tasks/${this.id}`);
    } else {
      this.router.navigateByUrl('/tasks');
    }
  }
}
