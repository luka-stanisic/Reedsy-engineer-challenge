import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Book } from '../shared/models/book';
import { Comment } from '../shared/models/comment';

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
		return this.http.get<Book>(environment.baseApiUrl + '/books/' + slug).pipe(
      map(book => {
        let allComments = JSON.parse(localStorage.getItem('comments'));
        if(allComments){
          book.comments = allComments[slug];
          if(book.comments?.length){
            book.comments = book.comments.sort((a,b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
          }
        }
        return book;
      })
    );
  }
  
  addComment(slug: string, comment: Comment): Observable<Book> {
    comment.datetime = new Date();
    let allComments = JSON.parse(localStorage.getItem('comments'));
    if(allComments){
      if(allComments.hasOwnProperty(slug)){
        allComments[slug].push(comment);
      } else {
        allComments[slug] = [comment];
      }
    } else {
      allComments = {
        [slug]: [comment]
      }
    }

    localStorage.setItem('comments', JSON.stringify(allComments));
    
    return this.getBookInfo(slug);
	}
}
