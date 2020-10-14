import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Book } from '../shared/models/book';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit {
  book$: Observable<Book>;

  constructor(private bookService: BooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.params['slug'];
    
    this.book$ = this.bookService.getBookInfo(slug);
  }
}
