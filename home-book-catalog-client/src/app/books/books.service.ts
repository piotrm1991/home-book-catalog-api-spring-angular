import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiUrl = "http://localhost:8080/api/books";

  private httpOptions : any;

  constructor(private http : HttpClient ) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.homebooks.forangular.v2+hal+json',
      })
    };
  }

  getBooks() : Observable<Book[]> {
    return this.http.get(this.apiUrl, this.httpOptions).pipe(map((res : any) => res));
  }

  getBook(id : number) : Observable<Book> {
    return this.http.get(this.apiUrl + `/${id}`, this.httpOptions).pipe(map((res : any) => res));
  } 

  addBook(data : any) : Observable<Book> {
    return this.http.post(this.apiUrl, data, this.httpOptions).pipe(map((res : any) => res));
  }

  updateBook(id: number, data : any) : Observable<Book> {
    return this.http.patch(this.apiUrl + `/${id}`, data, this.httpOptions).pipe(map((res : any) => res));
  }

  deleteBook(id : number) : Observable<Book> {
    return this.http.delete(this.apiUrl + `/${id}`, this.httpOptions).pipe(map((res : any) => res));
  }
}
