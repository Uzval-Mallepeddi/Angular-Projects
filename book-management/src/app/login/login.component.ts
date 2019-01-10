import { Component, OnInit } from '@angular/core';
import {Router, Routes} from '@angular/router';
import {AuthService} from '../authService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
  nav(page: string) {
    if (page === 'up') {
      this.router.navigate(['/signup']);
    }
    if (page === 'in') {
      this.router.navigate(['signin']);
    }
  }

}
