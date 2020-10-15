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
  onDestroy$ = new Subject();
  itemsPerPage = 4;

  allBooks: Book[];
  filteredBooks: Book[];
  booksOnPage: Book[];
  searchQuery: string;
  currentPage: number;
  startItem: number;
  endItem: number;

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

        this.filterBooks();
    });

    // get books
    this.bookService.getBooks()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((books) => {
        this.allBooks = books;
        this.filteredBooks = books;
        
        this.filterBooks();
    });
  }

  filterBooks(){       
    if(this.searchQuery && this.allBooks){
      this.filteredBooks = this.allBooks.filter((book) => {
        return book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
          book.synopsis.toLowerCase().includes(this.searchQuery.toLowerCase())
      });
    } else { 
      this.filteredBooks = this.allBooks;
    }
    this.resetPageItems();
  }

  resetPageItems(){
    this.currentPage = 1;
    this.startItem = 0;
    this.endItem = this.itemsPerPage;
    if(this.filteredBooks){
      this.booksOnPage = this.filteredBooks.slice(this.startItem, this.endItem);
    }
  }

  previousPage(){
    if(this.startItem > 0){
      this.currentPage--;
      this.startItem = (this.currentPage - 1) * this.itemsPerPage;
      this.endItem = this.currentPage * this.itemsPerPage;
  
      this.booksOnPage = this.filteredBooks.slice(this.startItem, this.endItem);
    }
  }

  nextPage(){
    if(this.endItem < this.filteredBooks.length){
      this.startItem = this.currentPage * this.itemsPerPage;
      this.currentPage++;
      this.endItem = this.currentPage * this.itemsPerPage;
  
      this.booksOnPage = this.filteredBooks.slice(this.startItem, this.endItem);
    }
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
