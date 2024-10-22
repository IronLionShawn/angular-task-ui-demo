import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private defaultOptions: { [key: string]: any } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  };

  constructor(protected http: HttpClient) { }

  get<T>(url: string, options: { [key:string]: any } = this.defaultOptions): Observable<T> {
    return this.http.get<T>(url,options);
  }

  post<T>(url: string, body: { [key: string]: any }, options: { [key:string]: any } = this.defaultOptions): Observable<T>  {
    return this.http.post<T>(url,body,options);
  }

  put<T>(url: string, body: { [key: string]: any }, options: { [key:string]: any } = this.defaultOptions): Observable<T>  {
    return this.http.put<T>(url,body,options);
  }

  delete<T>(url: string, options: { [key:string]: any } = this.defaultOptions): Observable<T>  {
    return this.http.delete<T>(url,options);
  }
}


