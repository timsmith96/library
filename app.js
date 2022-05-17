let myLibrary = [];
const form = document.querySelector('.form');
const newBtn = document.querySelector('.new-btn');
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-container');
const closeBtn = document.getElementById('close');
const booksContainer = document.querySelector('.books-container');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages}, ${
    this.read === false ? 'not read yet' : 'read'
  }`;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayBooks(books) {
  booksContainer.innerHTML = '';
  books.forEach((book, index) => {
    const newBook = document.createElement('div');
    newBook.classList.add('book');
    newBook.innerHTML = `<p class="title">${book.title}</p>
  <p class="author">${book.author}</p>
  <p class="pages">${book.pages} pages</p>
  <button onclick=toggleRead(event) data-index=${index} class=${
      book.read ? 'read' : 'not-read'
    }>${book.read === true ? 'Read' : 'Not read'}</button>
  <button onclick="remove(event)" data-index= ${index} class="remove-book">Remove</button>`;
    booksContainer.appendChild(newBook);
  });
}

function toggleRead(e) {
  let index = e.target.dataset.index;
  myLibrary[index].read = myLibrary[index].read === true ? false : true;
  displayBooks(myLibrary);
}

function remove(e) {
  let index = e.target.dataset.index;
  myLibrary.splice(index, 1);
  displayBooks(myLibrary);
}

newBtn.addEventListener('click', (e) => {
  modalContainer.classList.add('show');
});

closeBtn.addEventListener('click', (e) => {
  modalContainer.classList.remove('show');
});

document.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('modal-container')) {
    e.preventDefault();
    modalContainer.classList.toggle('show');
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const titleValue = title.value;
  const authorValue = author.value;
  const pagesValue = pages.value;
  const readValue = read.checked;
  addBookToLibrary(titleValue, authorValue, pagesValue, readValue);
  displayBooks(myLibrary);
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
  modalContainer.classList.remove('show');
});
