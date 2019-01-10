import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BooksService} from '../books.service';
import * as firebase from 'firebase';
import {AuthService} from '../authService';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private router: Router, private booksService: BooksService, private authService: AuthService) { }
  cartdata = [];
  selecteddata = {};
  length: number;
  noitem = true;
  ngOnInit() {
    this.cartdata = this.booksService.cartbooks;
    this.length = this.cartdata.length;
    if (this.length === 0) {
      this.noitem = true;
    } else {
      this.noitem = false;
    }
  }
  back() {
    this.router.navigate( ['books'], {queryParams: {'type': 'user'}});
  }
  removeitem(item_to_remove) {
    let index = 0;
    for (let item of this.cartdata) {
      if (item[0]['id'] === item_to_remove[0]['id']) {
        this.cartdata.splice(index, 1);
        index += 1;
      } else {
        index += 1;
      }
    }
    if (this.cartdata.length === 0) {
      this.noitem = true;
    } else {
      this.noitem = false;
    }
    this.booksService.cartbooks = this.cartdata;
  }
  logout() {
    firebase.auth().signOut();
    this.router.navigate(['']);
    this.authService.loggedin = null;
  }
}
