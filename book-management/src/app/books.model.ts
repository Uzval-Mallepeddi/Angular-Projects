export class Book {
  constructor(public id: number, public name: string, public price: number, public rating: number, public desc: string, public author: string, public imgpath: string, public bookpath: string) {
    this.id = id;
    this.author = author;
    this.desc = desc;
    this.price = price;
    this.rating = rating;
    this.name = name;
    this.bookpath = bookpath;
    this.imgpath = imgpath;
  }
}
