import { async, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BooksService } from './books.service';
import { Book } from '../shared/models/book';
import { defer, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('BooksService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: BooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBooks', () => {
    it('should return a collection of books', () => {
      const booksResponse = [
        {
          "author": "Marcel Proust",
          "cover": "http://Lukas-MacBook-Pro.local:3000/images/01.jpg",
          "rating": "9.9",
          "slug": "in-search-of-lost-time",
          "synopsis": "In Search of Lost Time, also translated as Remembrance of Things Past, novel in seven parts by Marcel Proust, published in French as À la recherche du temps perdu from 1913 to 1927. The novel is the story of Proust's own life, told as an allegorical search for truth.\nIn Search of Lost Time, also translated as Remembrance of Things Past, novel in seven parts by Marcel Proust, published in French as À la recherche du temps perdu from 1913 to 1927. The novel is the story of Proust's own life, told as an allegorical search for truth.",
          "title": "In Search of Lost Time",
          "upvoted": false,
          "upvotes": 1111
        },
        {
          "author": "Miguel de Cervantes",
          "cover": "http://Lukas-MacBook-Pro.local:3000/images/02.jpg",
          "rating": "9.8",
          "slug": "don-quixote",
          "synopsis": "Don Quixote is a middle-aged gentleman from the region of La Mancha in central Spain. Obsessed with the chivalrous ideals touted in books he has read, he decides to take up his lance and sword to defend the helpless and destroy the wicked.\nDon Quixote is a middle-aged gentleman from the region of La Mancha in central Spain. Obsessed with the chivalrous ideals touted in books he has read, he decides to take up his lance and sword to defend the helpless and destroy the wicked.",
          "title": "Don Quixote",
          "upvoted": true,
          "upvotes": 1022
        }
      ];
      let response;
      spyOn(service, 'getBooks').and.returnValue(of(booksResponse));

      service.getBooks().subscribe(res => {
        response = res;
      });

      expect(response).toEqual(booksResponse);
    });
  });
  
  describe('getBookInfo', () => {
    it('should return single book info', () => {
      const bookResponse = {
        "author": "Marcel Proust",
        "cover": "http://Lukas-MacBook-Pro.local:3000/images/01.jpg",
        "rating": "9.9",
        "slug": "in-search-of-lost-time",
        "synopsis": "In Search of Lost Time, also translated as Remembrance of Things Past, novel in seven parts by Marcel Proust, published in French as À la recherche du temps perdu from 1913 to 1927. The novel is the story of Proust's own life, told as an allegorical search for truth.\nIn Search of Lost Time, also translated as Remembrance of Things Past, novel in seven parts by Marcel Proust, published in French as À la recherche du temps perdu from 1913 to 1927. The novel is the story of Proust's own life, told as an allegorical search for truth.",
        "title": "In Search of Lost Time",
        "upvoted": false,
        "upvotes": 1111
      };
      let response;
      spyOn(service, 'getBookInfo').and.returnValue(of(bookResponse));

      service.getBookInfo('in-search-of-lost-time').subscribe(res => {
        response = res;
      });

      expect(response).toEqual(bookResponse);
    });
  });
  
});
