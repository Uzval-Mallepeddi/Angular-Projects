import { Component, OnInit } from '@angular/core';
import {AuthService} from '../authService';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authservice: AuthService, private router: Router) { }
  userid: string;
  usertype: string;
  wrongpassword = false;
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    const email = form.controls['username'].value;
    const pass = form.controls['password'].value;
    this.authservice.signin(email, pass).then(
      (response) => {
        this.userid = firebase.auth().currentUser.uid;
        this.authservice.loggedin = true;
        this.getuserType();
        this.authservice.usertype = this.usertype;
        if (this.usertype === 'admin') {
          this.router.navigate( ['admins']);
        } else {
          this.router.navigate(['books'], {queryParams: {'type': 'user'}});
        }
      },
    (error) => {
        this.wrongpassword = true;
    }
    );
}
  getuserType() {
    for (const id of this.authservice.adminIds) {
      if (id === this.userid) {
        this.usertype = 'admin';
      } else {
        this.usertype = 'user';
      }
    }
  }
}
