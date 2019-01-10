import {Component, DoCheck, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BooksService} from '../../books.service';
import {Book} from '../../books.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent implements OnInit {
  book: Book[];
  // = [new Book(1, 'asd', 123, 'asdasdasdasd', 'sfwr', 'asdasd')];
  constructor(private bookService: BooksService) { }
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    const id = form.controls['id'].value;
    const name = form.controls['name'].value;
    const desc = form.controls['desc'].value;
    const price = form.controls['price'].value;
    const author = form.controls['author'].value;
    const imgpath = form.controls['imgpath'].value;
    const bookpath = form.controls['bookpath'].value;
    const rating = form.controls['rating'].value;
    this.book = [new Book(id, name, price, rating, desc, author, imgpath, bookpath)];
      this.bookService.addBook(this.book).subscribe(
        (response) => {
          alert('"' + name + '"' + ' book is added');
          form.reset();
        },
        (error) => console.log(error)
      );
    // this.bookService.addBook(this.addBook);
  }
  resetform(form: NgForm) {
    form.reset();
  }
}

