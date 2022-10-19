import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Room } from 'src/app/models/rooms';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private apiUrl = "http://localhost:8080/api/rooms";

  private httpOptions : any;

  constructor(private http : HttpClient ) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.homebooks.forangular.v2+hal+json',
      })
    };
  }

  getRooms() : Observable<Room[]> {
    return this.http.get(this.apiUrl, this.httpOptions).pipe(map((res : any) => res));
  }

  getRoom(id : number) : Observable<Room> {
    return this.http.get(this.apiUrl + `/${id}`, this.httpOptions).pipe(map((res : any) => res));
  } 

  addRoom(data : any) : Observable<Room> {
    return this.http.post(this.apiUrl, data, this.httpOptions).pipe(map((res : any) => res));
  }

  updateRoom(id: number, data : any) : Observable<Room> {
    return this.http.patch(this.apiUrl + `/${id}`, data, this.httpOptions).pipe(map((res : any) => res));
  }

  deleteRoom(id : number) : Observable<Room> {
    return this.http.delete(this.apiUrl + `/${id}`, this.httpOptions).pipe(map((res : any) => res));
  }
}
