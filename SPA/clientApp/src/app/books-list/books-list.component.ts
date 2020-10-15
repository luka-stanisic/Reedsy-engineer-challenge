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

  allBooks: Book[];
  filteredBooks: Book[];
  searchQuery: string;
  isLoading: boolean;

  booksForPage: Book[];
  itemsPerPage = 4;
  currentPage: number;
  totalPages: number;
  pageNumbers: number[];
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
    this.isLoading = true;
    this.bookService.getBooks()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((books) => {
        this.allBooks = books;
        this.filterBooks();
        this.isLoading = false;
    });
  }

  // Filters books based on search query
  filterBooks(){     
    if(this.allBooks){
      if(this.searchQuery){
        this.filteredBooks = this.allBooks.filter((book) => {
          return book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
            book.synopsis.toLowerCase().includes(this.searchQuery.toLowerCase())
        });
      } else { 
        this.filteredBooks = this.allBooks;
      }

      this.resetPageItems();
    }
  }

  // resets pagination to beginning
  resetPageItems(){
    this.currentPage = 1;
    this.startItem = 0;
    this.endItem = this.itemsPerPage;
    this.totalPages = Math.ceil(this.filteredBooks.length / this.itemsPerPage);
    this.pageNumbers = [ ...Array(this.totalPages).keys() ].map((i) => i+1);
    this.setPageItems();
  }

  // sets items needed for current page
  setPageItems(){
    if(this.filteredBooks.length > this.itemsPerPage){
      this.booksForPage = this.filteredBooks.slice(this.startItem, this.endItem);
    } else {
      this.booksForPage = this.filteredBooks;
    }
  }

  // go to previous page
  previousPage(){
    if(this.startItem > 0){
      this.currentPage--;
      this.pageChanged();
    }
  }

  // go to next page
  nextPage(){
    if(this.endItem < this.filteredBooks.length){
      this.currentPage++;
      this.pageChanged();
    }
  }

  // go directly to clicked page
  goToPage(page: number){
    this.currentPage = page;
    this.pageChanged();
  }

  // triggered on every page change
  pageChanged(){
    this.startItem = (this.currentPage - 1) * this.itemsPerPage;
    this.endItem = this.currentPage * this.itemsPerPage;
    
    window.scrollTo(0,0);
    this.setPageItems();
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
