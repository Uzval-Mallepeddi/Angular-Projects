import * as firebase from 'firebase';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './authService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'book-management';
  constructor(private authService: AuthService) {}
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCY1Mf0j41u5dy8gFG-e9Zr6wSjXVpweQA',
      authDomain: 'ng-http-f6132.firebaseapp.com'
    });
  }
  onSubmit(form: NgForm) {
    const email = form.controls['user'].value;
    const pass = form.controls['pass'].value;
    this.authService.signup(email, pass);
  }
}
