import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BooksService } from '../services/books.service';
import { Book } from '../shared/models/book';
import { Comment } from '../shared/models/comment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit, OnDestroy {
  book: Book;
  comment: Comment;
  isLoading: boolean;
  onDestroy$ = new Subject();
  commentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  });

  constructor(private bookService: BooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.params['slug'];
    
    this.isLoading = true;
    this.bookService.getBookInfo(slug)
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((book) => {
      this.book = book;
      this.isLoading = false;
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

  addComment(){
    this.commentForm.markAllAsTouched();
    if(this.commentForm.valid){
      this.bookService.addComment(this.book.slug, this.commentForm.value)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((book) => {
        this.book = book;
      });
      this.commentForm.reset();
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
