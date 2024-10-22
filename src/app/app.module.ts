import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { HomeComponent } from './components/home/home.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortableTableHeaderDirective } from './directives/sortable-table-header.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    HomeComponent,
    TaskListComponent,
    SortableTableHeaderDirective,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
