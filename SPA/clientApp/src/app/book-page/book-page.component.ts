import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Book } from '../shared/models/book';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit {
  // book$: Observable<Book[]>;
  
  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    // this.book$ = this.bookService.getBookInfo(slug);
  }

}
