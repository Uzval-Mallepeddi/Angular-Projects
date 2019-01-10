import {Book} from './books.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './authService';

@Injectable()
export class BooksService {
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
  allbooks: Book[] = [];
  newbooks = [];
  cartbooks = [];
  books: any;
  addBook(bookdetails) {
    this.allbooks.push(bookdetails);
    return this.http.put('https://ng-http-f6132.firebaseio.com/books.json', this.allbooks);
  }
  getBooks() {
    return this.http.get('https://ng-http-f6132.firebaseio.com/books.json');
  }
  storecartbooks(cart) {
    this.cartbooks = cart;
  }
  editbook(bookscollection) {
    this.newbooks = bookscollection;
  }
  replacebooks(books) {
    this.http.put('https://ng-http-f6132.firebaseio.com/books.json', books).toPromise().then(
      (response) => {
        this.books = response;
        alert('Book editing successfull !');
        const usertype = this.authService.usertype;
        if (usertype === 'admin') {
          this.router.navigate(['books'], {queryParams: {'type': 'admin'}});
        } else {
          this.router.navigate(['books'], {queryParams: {'type': 'user'}});
        }
      }
    );
  }
}
