import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BooksService } from '../services/books.service';
import { Book } from '../shared/models/book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {
  books: Book[];
  onDestroy$ = new Subject();
  
  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    this.bookService.getBooks()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((books) => {
        this.books = books;
    });
  }

  toogleUpvote(book: Book){
    if(book.upvoted){
      book.upvoted = false;
      book.upvotes--;
    } else {
      book.upvoted = true;
      book.upvotes++;
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
