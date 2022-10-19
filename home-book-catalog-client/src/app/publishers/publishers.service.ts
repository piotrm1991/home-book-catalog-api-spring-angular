import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Publisher } from '../models/publisher';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {

  private apiUrl = "http://localhost:8080/api/publishers";

  private httpOptions : any;

  constructor(private http : HttpClient ) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.homebooks.forangular.v2+hal+json',
      })
    };
  }

  getPublishers() : Observable<Publisher[]> {
    return this.http.get(this.apiUrl, this.httpOptions).pipe(map((res : any) => res));
  }

  getPublisher(id : number) : Observable<Publisher> {
    return this.http.get(this.apiUrl + `/${id}`, this.httpOptions).pipe(map((res : any) => res));
  } 

  addPublisher(data : any) : Observable<Publisher> {
    return this.http.post(this.apiUrl, data, this.httpOptions).pipe(map((res : any) => res));
  }

  updatePublisher(id: number, data : any) : Observable<Publisher> {
    return this.http.patch(this.apiUrl + `/${id}`, data, this.httpOptions).pipe(map((res : any) => res));
  }

  deletePublisher(id : number) : Observable<Publisher> {
    return this.http.delete(this.apiUrl + `/${id}`, this.httpOptions).pipe(map((res : any) => res));
  }
}
