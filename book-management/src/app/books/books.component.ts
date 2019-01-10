import {Component, OnInit} from '@angular/core';
import {BooksService} from '../books.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../authService';
import * as firebase from 'firebase';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  allbooks = {};
  bookscollection = {};
  flag = false;
  img: string;
  desc: string;
  id: number;
  usertype: string;
  name: string;
  author: string;
  bookpath: string;
  price: number;
  data: string;
  typeofuser: string;
  shoppingcartlength: number;
  shoppingcart = [];
  selectedid: number;
  show = false;
  constructor(private booksService: BooksService, private router: Router, private authService: AuthService,
              private route: ActivatedRoute) {}
  allowvisibility = true;
  ngOnInit() {
    this.usertype = this.authService.usertype;
    this.booksService.getBooks().toPromise().then(
      (response) => {
        this.allbooks = response;
        this.flag = true;
      }
    );
    if (this.booksService.cartbooks.length > 0) {
      this.shoppingcart = this.booksService.cartbooks;
    } else {
      this.shoppingcart = this.shoppingcart;
    }
    this.shoppingcartlength = this.shoppingcart.length;
    this.typeofuser = this.route.snapshot.queryParams['type'];
  }
  checknav() {
    const type = this.authService.usertype;
    if (type === 'admin') {
      this.allowvisibility = !this.allowvisibility;
      this.router.navigate(['admins']);
    } else {
      this.router.navigate(['admins']);
    }
  }
  onClick(selectedid, bookid) {
    this.show = true;
    this.name = this.allbooks[selectedid][0]['name'];
    this.author = this.allbooks[selectedid][0]['author'];
    this.img = this.allbooks[selectedid][0]['imgpath'];
    this.price = this.allbooks[selectedid][0]['price'];
    this.desc = this.allbooks[selectedid][0]['desc'];
    this.id = this.allbooks[selectedid][0]['id'];
    this.bookpath = this.allbooks[selectedid][0]['bookpath'];
    this.selectedid = selectedid;
  }
  gotocart() {
    this.router.navigate( ['cart']);
  }
  checklength() {
    this.shoppingcartlength = this.shoppingcart.length;
  }
  addtocart() {
    const item = this.allbooks[this.selectedid];
    this.shoppingcart.push(item);
    this.booksService.storecartbooks(this.shoppingcart);
    this.checklength();
    alert('Book' + ' "' + this.name + '" ' + 'Added into cart !');
  }
  edit() {
    console.log(this.id);
    this.bookscollection = this.allbooks;
    this.booksService.editbook(this.bookscollection);
    this.router.navigate(['editbook', this.id]);
  }
  logout() {
    firebase.auth().signOut();
    this.router.navigate(['']);
    this.authService.loggedin = null;
  }
}
