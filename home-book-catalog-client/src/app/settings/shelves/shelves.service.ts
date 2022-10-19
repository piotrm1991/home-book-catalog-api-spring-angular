import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Shelf } from 'src/app/models/shelf';

@Injectable({
  providedIn: 'root'
})
export class ShelvesService {

  private apiUrl = "http://localhost:8080/api/shelves";

  private httpOptions : any;

  constructor(private http : HttpClient ) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.homebooks.forangular.v2+hal+json',
      })
    };
  }

  getShelves() : Observable<Shelf[]> {
    return this.http.get(this.apiUrl, this.httpOptions).pipe(map((res : any) => res));
  }

  getShelf(id : number) : Observable<Shelf> {
    return this.http.get(this.apiUrl + `/${id}`, this.httpOptions).pipe(map((res : any) => res));
  } 

  addShelf(data : any) : Observable<Shelf> {
    return this.http.post(this.apiUrl, data, this.httpOptions).pipe(map((res : any) => res));
  }

  updateShelf(id: number, data : any) : Observable<Shelf> {
    return this.http.patch(this.apiUrl + `/${id}`, data, this.httpOptions).pipe(map((res : any) => res));
  }

  deleteShelf(id : number) : Observable<Shelf> {
    return this.http.delete(this.apiUrl + `/${id}`, this.httpOptions).pipe(map((res : any) => res));
  }

  getShelvesByRoomId(id : number) : Observable<Shelf[]> {
    let options = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.homebooks.forangular.v2+hal+json',
      }),
      params: {
        'idRoom': id
      }
    };
    return this.http.get(this.apiUrl, options).pipe(map((res : any) => res));
  }
}
