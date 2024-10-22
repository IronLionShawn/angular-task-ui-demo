import { TaskObject } from './../../types/models/task';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('RestService', () => {
  let service: RestService;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  const mockTasks = [
    { id: 1, task: 'test 1', description: 'test q', status: 0 },
    { id: 2, task: 'test 2', description: 'test a', status: 1 },
    { id: 3, task: 'test 3', description: 'test 3', status: 1 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestService]
    });
    httpSpy = jasmine.createSpyObj('HttpClient', ['get','post','put','delete']);
    service = new RestService(httpSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve tasks from get', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(mockTasks));
    service.get<TaskObject[]>('api/v1/tasks').subscribe(tasks => {
      expect(tasks.length).toBe(3);
      expect(tasks).withContext('expected task').toEqual(mockTasks);
      done();
    });
  });

  it('should retrieve specific task from get', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(mockTasks[0]));
    service.get<TaskObject>('api/v1/tasks/1').subscribe(tasks => {
      expect(tasks).withContext('expected task').toEqual(mockTasks[0]);
      done();
    });
  });

  it('should post to api', (done: DoneFn) => {
    const newTask: TaskObject =  { id: 3, task: 'test 3', description: 'test 3', status: 1 };
    httpSpy.post.and.returnValue(of(newTask));
    service.post<TaskObject>('api/v1/tasks/',newTask).subscribe(tasks => {
      expect(tasks).withContext('expected task').toEqual(newTask);
      done();
    });
  });

  it('should update data using put', (done: DoneFn) => {
    httpSpy.put.and.returnValue(of(mockTasks[1]));
    service.put<TaskObject>('api/v1/tasks/2',mockTasks[1]).subscribe(tasks => {
      expect(tasks).withContext('expected task').toEqual(mockTasks[1]);
      done();
    });
  });

  it('should delete task by id', (done: DoneFn) => {
    httpSpy.delete.and.returnValue(of(mockTasks[2]));
    service.delete<TaskObject>('api/v1/tasks/3').subscribe(tasks => {
      expect(tasks).withContext('expected task').toEqual(mockTasks[2]);
      done();
    });
  });
});
