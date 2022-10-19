import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StatusType } from 'src/app/models/status-type';

@Injectable({
  providedIn: 'root'
})
export class StatusTypesService {

  private apiUrl = "http://localhost:8080/api/statustypes";

  private httpOptions : any;

  constructor(private http : HttpClient ) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.homebooks.forangular.v2+hal+json',
      })
    };
  }

  getStatusTypes() : Observable<StatusType[]> {
    return this.http.get(this.apiUrl, this.httpOptions).pipe(map((res : any) => res));
  }

  getStatusType(id : number) : Observable<StatusType> {
    return this.http.get(this.apiUrl + `/${id}`, this.httpOptions).pipe(map((res : any) => res));
  } 

  addStatusType(data : any) : Observable<StatusType> {
    return this.http.post(this.apiUrl, data, this.httpOptions).pipe(map((res : any) => res));
  }

  updateStatusType(id: number, data : any) : Observable<StatusType> {
    return this.http.patch(this.apiUrl + `/${id}`, data, this.httpOptions).pipe(map((res : any) => res));
  }

  deleteStatusType(id : number) : Observable<StatusType> {
    return this.http.delete(this.apiUrl + `/${id}`, this.httpOptions).pipe(map((res : any) => res));
  }
}
