import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
   } from '@angular/common/http';
import { Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private injector: Injector, private ngZone: NgZone) { }

    get router(): Router {
        return this.injector.get(Router);
    }
        
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
        .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                setTimeout(() => {
                    this.ngZone.run(() => this.router.navigate(['error']));
                });
                return throwError(error);
            })
        )
    }
}