import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthService} from './authService';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {RouterModule, Routes} from '@angular/router';
import { AdminsComponent } from './admins/admins.component';
import {BooksComponent} from './books/books.component';
import { AddBookComponent } from './admins/add-book/add-book.component';
import {BooksService} from './books.service';
import {HttpClientModule} from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
import {CanActivateGuard} from './can-activate.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import {EditBookComponent} from './edit-book/edit-book.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'admins', component: AdminsComponent, children: [
      {path: 'addbook', component: AddBookComponent}
    ]},
  {path: 'books', component: BooksComponent},
  {path: 'cart', component: CartComponent},
  {path: 'editbook/:id', component: EditBookComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    SignupComponent,
    AdminsComponent,
    BooksComponent,
    AddBookComponent,
    CartComponent,
    NotFoundComponent,
    EditBookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, BooksService, CanActivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
