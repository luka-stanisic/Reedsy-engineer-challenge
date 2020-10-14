import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { BooksService } from '../services/books.service';
import { Book } from '../shared/models/book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {
  books: Book[];
  booksToShow: Book[];
  searchQuery: string;
  onDestroy$ = new Subject();
  
  constructor(
    private bookService: BooksService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {
    // get query params
    this.route.queryParams
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(params => {
        this.searchQuery = params.search;
    });

    // get books
    this.bookService.getBooks()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((books) => {
        this.books = books;
    });
  }

  clearSearch(){
    this.router.navigate(['/books']);
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
