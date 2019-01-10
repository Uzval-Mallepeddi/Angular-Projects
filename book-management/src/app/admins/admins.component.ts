import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BooksService} from '../books.service';
import {AuthService} from '../authService';
import * as firebase from 'firebase';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  allowvisibility = true;
  navigated = false;
  allbooks = {};
  constructor(private router: Router, private booksService: BooksService, private authService: AuthService) { }

  ngOnInit() {
    this.booksService.getBooks().toPromise().then(
      (response) => {
        this.allbooks = response;
      }
    );
  }

  nav(where) {
    if (where === 'add') {
      this.navigated = !this.navigated;
      this.allowvisibility = !this.allowvisibility;
      this.router.navigate(['admins', 'addbook']);
    } else {
      this.router.navigate(['books'], {queryParams: {'type': 'admin'}});
    }
  }
  checknav() {
    this.navigated = !this.navigated;
    this.allowvisibility = !this.allowvisibility;
    this.router.navigate(['admins']);
  }
  logout() {
    firebase.auth().signOut();
    this.router.navigate(['']);
    this.authService.loggedin = null;
  }
}
