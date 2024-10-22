import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskComponent } from './components/task/task.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', 
    children: [
      { path: '', component: TaskListComponent },
      { path: 'add', component: TaskComponent, data: { type: 'create'} },
      { path: ':id', component: TaskComponent, data: { type: 'read'} },
      { path: ':id/edit', component: TaskComponent, data: { type: 'update'} },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
