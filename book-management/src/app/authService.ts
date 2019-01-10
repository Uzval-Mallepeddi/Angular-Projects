import * as firebase from 'firebase';
import {OnInit} from '@angular/core';
import {resolve} from 'q';

export class AuthService implements OnInit {
  userid: string;
  usertype: string;
  loggedin = null;
  adminIds = ['z9hmcdz4H9X1PQk1IC19nDFOeEj1'];
  ngOnInit() {
  }
  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  typeofUser() {
    for (const id of this.adminIds) {
      if (id === this.userid) {
        this.usertype = 'admin';
      } else {
       this.usertype = 'user';
      }
    }
  }
  isAuthenticated() {
    if (this.loggedin === false) {
      return false;
    } if (this.loggedin === true) {
      return true;
    } else {
      return null;
    }
  }
}
