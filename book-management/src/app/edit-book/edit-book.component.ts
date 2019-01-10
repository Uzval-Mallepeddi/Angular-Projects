import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BooksService} from '../books.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from '../authService';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  constructor(private bookService: BooksService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {}
  bookscollection = [];
  editedbookscollection = [];
  @ViewChild('form') editform: NgForm;
  id: number;
  bookid: string;
  bookname: string;
  bookauthor: string;
  bookdesc: string;
  bookrating: string;
  bookprice: string;
  bkpath: string;
  bookimgpath: string;
  ngOnInit() {
    this.bookid = this.route.snapshot.params['id'];
    this.id = +this.bookid;
    this.bookscollection = this.bookService.newbooks;
    for (const book of this.bookscollection) {
      if (book[0]['id'] === this.id) {
        this.bookname = book[0]['name'];
        this.bookauthor = book[0]['author'];
        this.bookdesc = book[0]['desc'];
        this.bkpath = book[0]['bookpath'];
        this.bookimgpath = book[0]['imgpath'];
        this.bookrating = book[0]['rating'];
        this.bookprice = book[0]['price'];
      }
    }
  }
  onSubmit(id, nm, auth, prc, rtng, des, img, bpath) {
    for (const book of this.bookscollection) {
      if (book[0]['id'] === this.id) {
        book[0]['id'] = +id;
        book[0]['name'] = nm;
        book[0]['author'] = auth;
        book[0]['price'] = +prc;
        book[0]['rating'] = +rtng;
        book[0]['desc'] = des;
        book[0]['imgpath'] = img;
        book[0]['bookpath'] = bpath;
      }
    }
    this.bookService.newbooks = this.bookscollection;
    this.bookService.replacebooks(this.bookscollection);
  }
  back() {
    this.router.navigate(['books'], {queryParams: {'type': 'admin'}});
  }
  logout() {
    firebase.auth().signOut();
    this.router.navigate(['']);
    this.authService.loggedin = null;
  }
}
