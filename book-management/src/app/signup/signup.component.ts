import { Component, OnInit } from '@angular/core';
import {AuthService} from '../authService';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  passcheck = null;
  created = null;
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    const email = form.controls['username'].value;
    const pass = form.controls['password'].value;
    const passcheck = form.controls['passwordcheck'].value;
    if (pass === passcheck) {
      this.passcheck = true;
      this.authService.signup(email, pass).then(
        (response) => {
          this.created = true;
        },
        (error) => {
          this.created = false;
        }
      );
    } else {
      this.passcheck = false;
    }
  }
}
