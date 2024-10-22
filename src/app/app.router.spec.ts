import { FormBuilder } from '@angular/forms';
import { RestService } from './services/rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
/* tslint:disable:no-unused-variable */
import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from './app.component';
import { Router } from "@angular/router";
import { routes } from './app-routing.module';
import { HomeComponent } from "./components/home/home.component";
import { TaskListComponent } from './components/task-list/task-list.component';

describe("Router: app",() => {
    let location: Location;
    let router: Router;
    let fixture: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
          providers: [RestService, FormBuilder],
          declarations: [HomeComponent, TaskListComponent, AppComponent]
        });
    
        router = TestBed.get(Router);
        location = TestBed.get(Location);
    
        fixture = TestBed.createComponent(AppComponent);
        router.initialNavigation();
    });

    it("fakeAsync works", fakeAsync(() => {
        let promise = new Promise(resolve => {
          setTimeout(resolve, 10);
        });
        let done = false;
        promise.then(() => (done = true));
        tick(50);
        expect(done).toBeTruthy();
    }));
    
    it('navigate to "" takes you to "/', fakeAsync(() => {
        router.navigate([""]).then((data) => {
          expect(location.path()).toBe("/");
        });
    }));

    it('navigate to "" expect router-outlet to display Home Component', fakeAsync(() => {
        router.navigate([""]).then(() => {
            const compiled = fixture.nativeElement as HTMLElement;
            expect(compiled.querySelector('app-home')).toBeTruthy();
        });
    }));
    
    it('navigate to "tasks" takes you to /tasks and renders task list component', fakeAsync(() => {
        router.navigate(["/tasks"]).then(() => {
          const compiled = fixture.nativeElement as HTMLElement;
          expect(location.path()).toBe("/tasks");
          expect(compiled.querySelector('app-task-list')).toBeTruthy();
        });
    }));

    it('navigate to "tasks/:id" routes expect router-outlet to display Task Component', fakeAsync(() => {
        router.navigate(["/tasks/1"]).then(() => {
            const compiled = fixture.nativeElement as HTMLElement;
            expect(compiled.querySelector('app-task')).toBeTruthy();
        });

        router.navigate(["/tasks/add"]).then(() => {
            const compiled = fixture.nativeElement as HTMLElement;
            expect(compiled.querySelector('app-task')).toBeTruthy();
        });

        router.navigate(["/tasks/1/edit"]).then(() => {
            const compiled = fixture.nativeElement as HTMLElement;
            expect(compiled.querySelector('app-task')).toBeTruthy();
        });
    }));
});