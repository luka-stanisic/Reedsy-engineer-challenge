import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookPageComponent } from './book-page/book-page.component';
import { BooksListComponent } from './books-list/books-list.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
	{ path: '', redirectTo: 'books', pathMatch: 'full' },
	{ path: 'books', component: BooksListComponent },
	{ path: 'books/:slug', component: BookPageComponent },
	{ path: 'error', component: ErrorComponent },
	{ path: '**', component: BooksListComponent },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
