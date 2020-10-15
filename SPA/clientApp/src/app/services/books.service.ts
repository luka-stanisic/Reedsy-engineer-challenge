import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Book } from '../shared/models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
	constructor(private http: HttpClient) {}

	getBooks(): Observable<Book[]> {
		return this.http.get<Book[]>(environment.baseApiUrl + '/books').pipe(
      map((resp: any) => {
        if (resp && resp.books) {
          for(let i=0; i<resp.books.length; i++){
            resp.books[i].rank = i+1;
          }
          return resp.books;
        }
      })
    );
	}

	getBookInfo(slug: string): Observable<Book> {
		return this.http.get<Book>(environment.baseApiUrl + '/books/' + slug);
	}
}
