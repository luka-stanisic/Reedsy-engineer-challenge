import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookPageComponent } from './book-page/book-page.component';
import { HeaderComponent } from './header/header.component';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { HttpErrorInterceptor } from './shared/http-error.interceptor';
import { ErrorComponent } from './error/error.component';
import { TimeSincePipe } from './shared/pipes/time-since.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookPageComponent,
    HeaderComponent,
    TruncatePipe,
    SpinnerComponent,
    ErrorComponent,
    TimeSincePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
