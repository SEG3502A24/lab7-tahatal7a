import { Component, OnInit } from '@angular/core';
import {Author, Book} from '../books/model/book';
import {BooksService} from '../books/service/books.service';
import {AbstractControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent {
  constructor(public booksService: BooksService) { }


  transform(value: Author[]): string {
    return value.map((author) => `${author.firstName}, ${author.lastName}`).join(' and ');
  }

}



