import { Alert } from './../types/alert';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private _alertSubject: Subject<string> = new Subject<string>();

  title = 'Tasks Demo';
  
  protected routes = [
    { name: 'Home', link: '/' },
    { name: 'Tasks', link: '/tasks' }
  ];

  protected alertObject: Alert = {
    message: '',
    type: 'info'
  }; 

  @ViewChild('globalAlert', {static: false}) 
  protected alertComponent!: NgbAlert;

  ngOnInit(): void {
    this._alertSubject.subscribe(message => this.alertObject.message = message);
    this._alertSubject.pipe(debounceTime(1000)).subscribe(() => {
      if(this.alertComponent) {
        this.alertComponent.close();
      }
    });
  }

  protected resetAlert() {
    this.alertObject = {
      message: '',
      type: 'info'
    };
  }

  protected onAlertClose() {
    if(this.alertObject.callback) {
      this.alertObject.callback();
    }
    this.resetAlert();
  }
}
