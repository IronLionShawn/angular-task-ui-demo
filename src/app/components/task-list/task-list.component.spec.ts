import { RestService } from './../../services/rest.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  // const restService: RestService = new RestService(HttpClent)

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ TaskListComponent ],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title should be "Task List"', () => {
    const taskList = fixture.componentInstance;
    expect(taskList.title).toEqual('Task List');
  });

  it('should render a bootstrap table with 6 rows', () => {
    component.dataLoaded = true;
    component.sortedTasks = [
      { id: 1, task: 'test 1', description: 'test q', status: 0 },
      { id: 2, task: 'test 2', description: 'test a', status: 1 },
      { id: 3, task: 'test 3', description: 'test 3', status: 1 },
      { id: 4, task: 'test 4', description: 'test g', status: 0 },
      { id: 5, task: 'test 5', description: 'test v', status: 1 },
      { id: 6, task: 'test 6', description: 'test 1', status: 1 },
    ];
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('table.table')).toBeTruthy();
    expect(element.querySelectorAll('table.table tbody tr td:nth-child(1)').length).toBe(6);
    expect(element.querySelector('table.table tbody tr td:nth-child(1)')?.innerHTML).toBe('1');
  });
});
