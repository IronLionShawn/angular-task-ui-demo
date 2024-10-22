import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain Angular img',() => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img')?.alt;
    expect(img).toBe('Angular Logo');
  });

  it('title should be "Angular UI Quiz"',() => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.card-title')?.innerHTML;
    expect(title).toBe('Angular UI Quiz');
  });

  it('body should contain submission text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const body = compiled.querySelector('.card-body')?.innerHTML;
    expect(body).toContain('This is my Web UI Quiz submission');
  });
});
