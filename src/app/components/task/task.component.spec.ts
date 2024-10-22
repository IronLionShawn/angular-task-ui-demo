import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [FormBuilder],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ TaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title should be "Task List"', () => {
    const task = fixture.componentInstance;
    expect(task.title).toEqual('Task');
  });

  it('should render 2 inputs and 1 select', () => {
    component.dataLoaded = true;
    const task = fixture.componentInstance;
    const element = fixture.nativeElement as HTMLElement;
    console.log('element: ',element);
    fixture.detectChanges();
    expect(element.querySelectorAll('input').length).toEqual(2);
    expect(element.querySelectorAll('select').length).toEqual(1);
  });
});
