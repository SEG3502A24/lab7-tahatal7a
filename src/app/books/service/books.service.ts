import {Injectable} from '@angular/core';
import {Author, Book} from '../model/book';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const Url = 'http://localhost:8080/books-api/';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books = [
    new Book(1001, 'Tech', 'Introduction to Angular', 50.25, [new Author(1, 'Bob', 'Marley')], 2017),
    new Book(1002, 'Tech', 'Angular Advanced Concepts', 125.95, [new Author(2, 'Zorb', 'Tar')], 2019),
    new Book(1003, 'Kids', 'A Fantastic Story', 12.25, [new Author(3, 'Jane', 'C'), new Author(4, 'Tala', 'Tolo')], 2009),
    new Book(1004, 'Cook', 'The Best Shawarmas', 18.99, [new Author(5, 'Chef', 'Z')], 1978),
    new Book(1005, 'Tech', 'Angular Demystified', 210.50, [new Author(6, 'Zorb', 'Tar')], 2020)
  ];

  constructor(private http: HttpClient) {}

  public getBook(id: string): Observable<Book> {
    return this.http.get<Book>(Url + 'books/' + id);
  }

  public addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(Url + 'books', book);
  }



  public addBookAuthor(id: number, author: Author): Observable<Author> {
    return this.http.post<Author>(Url + 'books/' + id + '/authors', author);
  }

  public getAuthorsNamed(firstName: string, lastName: string): Observable<any> {
    const options = {params: new HttpParams().set('firstName', firstName).set('lastName', lastName)};
    return this.http.get<any>(Url + 'authors', options).pipe(
      map(response => response._embedded ? response._embedded.authors : undefined )
    );
  }

  public updateBookAuthors(bookId: number, authorId: number): Observable<any> {
    return this.http.patch(Url + 'books/' + bookId + '/authors/' + authorId, {});
  }
}
