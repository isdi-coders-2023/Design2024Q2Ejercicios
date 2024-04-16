/* 
  Este fichero contiene ejercicios básicos de programación orientada a objetos.
  Para ello, jugaremos con la siguiente descripción básica: queremos desarrollar
  una aplicación para la gestión de la nueva tienda de libros que hemos abierto.

  En nuestra tienda de libros tenemos libros de compra y de alquiler. Todos los
  libros tienen un título, un autor y un precio. Los libros de compra tienen un
  ISBN, mientras que los libros de alquiler tienen un plazo de alquiler. Además,
  los libros de alquiler tienen un precio de alquiler por día.

  Para poder gestionar nuestra tienda de libros, necesitamos una clase que nos
  permita almacenar la información de los libros. Esta clase debe tener un método
  que nos permita obtener el precio de un libro en función de si es de compra o
  de alquiler. Además, debe tener un método que nos permita obtener el precio
  total de un libro de alquiler en función del número de días que se alquila.

  Por último, necesitamos una clase que nos permita almacenar la información de
  los clientes de nuestra tienda. Esta clase debe tener un método que nos permita
  obtener el precio total de los libros que ha comprado un cliente, así como un
  método que nos permita obtener el precio total de los libros que ha alquilado
  un cliente en función del número de días que los ha tenido.
  */

// Ejericicio 1: Implementa la clase Book y úsala para crear un libro de compra y otro de alquiler.
// class Book {
//   title: string;
//   author: string;
//   price: number;
//   type: "purchase" | "rent" = "purchase";

//   constructor(
//     title: string,
//     author: string,
//     price: number,
//     type: "purchase" | "rent" = "purchase"
//   ) {
//     this.title = title;
//     this.author = author;
//     this.price = price;
//     this.type = type;
//   }

//   getPrice(): number {
//     return this.price;
//   }

//   // Método para obtener el precio de un libro de alquiler
//   getRentPrice(days: number): number {
//     return this.price * days;
//   }

//   // Método para obtener el precio de un libro de compra
//   getPurchasePrice(): number {
//     return this.price;
//   }

//   // Método para obtener el precio de un libro en función de si es de compra o de alquiler
//   getTotalPrice(days: number = 0): number {
//     return this.type === "purchase"
//       ? this.getPurchasePrice()
//       : this.getRentPrice(days);
//   }

//   toString(): string {
//     return `Title: ${this.title}, Author: ${this.author}, Price: ${this.price}, Type: ${this.type}`;
//   }
// }

// const purchaseBook = new Book("El Quijote", "Miguel de Cervantes", 20);
// const rentBook = new Book(
//   "El Señor de los Anillos",
//   "J.R.R. Tolkien",
//   30,
//   "rent"
// );

// console.log(purchaseBook.toString());
// console.log(rentBook.toString());

// Ejercicio 2: Implementa la clase Customer y úsala para crear un cliente con dos libros de compra y uno de alquiler.

// class Customer {
//   name: string;
//   purchaseBooks: Book[];
//   rentBooks: Book[];

//   constructor(name: string) {
//     this.name = name;
//     this.purchaseBooks = [];
//     this.rentBooks = [];
//   }

//   addPurchaseBook(book: Book): void {
//     this.purchaseBooks.push(book);
//   }

//   addRentBook(book: Book): void {
//     this.rentBooks.push(book);
//   }

//   getTotalPurchasePrice(): number {
//     return this.purchaseBooks.reduce(
//       (total, book) => total + book.getPurchasePrice(),
//       0
//     );
//   }

//   getTotalRentPrice(days: number): number {
//     return this.rentBooks.reduce(
//       (total, book) => total + book.getRentPrice(days),
//       0
//     );
//   }

//   getTotalPrice(days: number = 0): number {
//     return this.getTotalPurchasePrice() + this.getTotalRentPrice(days);
//   }

//   listPurchaseBooks(): string[] {
//     return this.purchaseBooks.map((book) => book.toString());
//   }

//   listRentBooks(): string[] {
//     return this.rentBooks.map((book) => book.toString());
//   }

//   toString(): string {
//     return `Name: ${
//       this.name
//     }, Purchase Books:\n  ${this.listPurchaseBooks()}, Rent Books:\n  ${this.listRentBooks()}`;
//   }
// }

// const customer = new Customer("John Doe");
// customer.addPurchaseBook(purchaseBook);
// customer.addPurchaseBook(purchaseBook);
// customer.addRentBook(rentBook);

// console.log(customer.toString());
// console.log(customer.getTotalPurchasePrice());
// console.log(customer.getTotalRentPrice(5));
// console.log(customer.getTotalPrice(5));

// Ejercicio 3: Implementa la clase BookStore y úsala para crear una tienda de libros con un cliente y varios libros.
// class BookStore {
//   name: string;
//   books: Book[];
//   customers: Customer[];

//   constructor(name: string) {
//     this.name = name;
//     this.books = [];
//     this.customers = [];
//   }

//   addBook(book: Book): void {
//     this.books.push(book);
//   }

//   addCustomer(customer: Customer): void {
//     this.customers.push(customer);
//   }

//   listBooks(): string[] {
//     return this.books.map((book) => book.toString());
//   }

//   listCustomers(): string[] {
//     return this.customers.map((customer) => customer.toString());
//   }

//   toString(): string {
//     return `Name: ${
//       this.name
//     }\n Books: ${this.listBooks()} \n Customers: \n ${this.listCustomers()}`;
//   }
// }

// const bookStore = new BookStore("BookStore");
// bookStore.addBook(purchaseBook);
// bookStore.addBook(rentBook);
// bookStore.addCustomer(customer);

// console.log(bookStore.toString());
