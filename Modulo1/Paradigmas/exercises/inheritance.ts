// Ejercicio 4: La clase libro tiene un atributo type que indica si es de compra o alquiler, lo cual
// se utiliza para seleccionar los métodos que utilizar para calcular el precio total de un libro.
// Reimplementa la clase book para que en lugar de tener un atributo type, tenga dos clases hijas,
// PurchaseBook y RentBook, que implementen los métodos getPurchasePrice y getRentPrice respectivamente.
class BaseBook {
  title: string;
  author: string;
  price: number;

  constructor(title: string, author: string, price: number) {
    this.title = title;
    this.author = author;
    this.price = price;
  }

  getTotalPrice(): number {
    return 0;
  }

  getType(): string {
    return "base";
  }

  toString(): string {
    return `Title: ${this.title}, Author: ${this.author}, Price: ${
      this.price
    }, Type: ${this.getType()}`;
  }
}

class PurchaseBook extends BaseBook {
  constructor(title: string, author: string, price: number) {
    super(title, author, price);
  }

  getTotalPrice(): number {
    return this.price;
  }

  getType(): string {
    return "purchase";
  }
}

class RentBook extends BaseBook {
  days: number;

  constructor(title: string, author: string, price: number, days: number) {
    super(title, author, price);
    this.days = days;
  }

  getTotalPrice(): number {
    return this.price * this.days;
  }

  getType(): string {
    return "rent";
  }
}

const purchaseBook = new PurchaseBook("El Quijote", "Miguel de Cervantes", 20);
const rentBook = new RentBook(
  "El Señor de los Anillos",
  "J.R.R. Tolkien",
  30,
  6
);

console.log(purchaseBook.toString());
console.log(rentBook.toString());

// Ejercicio 5: Reimplementa la clase Customer para que en lugar de tener dos arrays de libros,
// tenga un array de libros de la clase base Book. Modifica el constructor de la clase Customer
// para que reciba un array de libros de la clase base Book y modifica el método getTotalPrice
// para que utilice el método getTotalPrice de cada libro.

class Customer {
  name: string;
  books: BaseBook[];

  constructor(name: string, books: BaseBook[]) {
    this.name = name;
    this.books = books;
  }

  getTotalPrice(): number {
    return this.books.reduce((total, book) => total + book.getTotalPrice(), 0);
  }

  listBooks(): string {
    return this.books.map((book) => book.toString()).join(",\n  ");
  }

  toString(): string {
    return `Name: ${
      this.name
    },\n Total Price: ${this.getTotalPrice()}, \n Books:\n  ${this.listBooks()}`;
  }
}

const customer = new Customer("John Doe", [purchaseBook, rentBook]);

console.log(customer.toString());

// Ejercicio 6: Crea una clase BookStore que tenga un array de libros a la venta y libros
// de alquiler. Implementa los métodos necesarios para que se puedan agregar libros a ambos
// arrays y para que se pueda facturar los libros que se llevan un cliente. Añade los métodos
// necesarios para el seguimiento de los libros prestados, y para que se puedan devolver, y
// consultar los libros prestados en un momento dado.

class BookStore {
  purchaseBooks: PurchaseBook[];
  rentBooks: RentBook[];
  rentedBooks: RentBook[];

  constructor() {
    this.purchaseBooks = [];
    this.rentBooks = [];
    this.rentedBooks = [];
  }

  addPurchaseBook(book: PurchaseBook): void {
    this.purchaseBooks.push(book);
  }

  addRentBook(book: RentBook): void {
    this.rentBooks.push(book);
  }

  rentBook(book: RentBook): void {
    this.rentedBooks.push(book);
  }

  returnBook(book: RentBook): void {
    this.rentedBooks = this.rentedBooks.filter((b) => b !== book);
  }

  listRentedBooks(): string {
    return this.rentedBooks.map((book) => book.toString()).join(",\n  ");
  }

  processOrder(customer: Customer): number {
    const totalPrice = customer.getTotalPrice();
    this.purchaseBooks = this.purchaseBooks.filter(
      (book) => !customer.books.includes(book)
    );
    this.rentBooks = this.rentBooks.filter(
      (book) => !customer.books.includes(book)
    );
    customer.books.forEach((book) => {
      if (book instanceof RentBook) {
        this.rentedBooks.push(book);
      }
    });
    return totalPrice;
  }
}

const bookStore = new BookStore();

bookStore.addPurchaseBook(purchaseBook);
bookStore.addRentBook(rentBook);

const customer2 = new Customer("Jane Doe", [purchaseBook, rentBook]);

console.log(bookStore.processOrder(customer2));

console.log(bookStore.listRentedBooks());
console.log(bookStore.purchaseBooks);
console.log(bookStore.rentBooks);
