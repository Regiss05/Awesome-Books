const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const submitButton = document.getElementById('button');

const bookListDiv = document.getElementById('')
const formDiv = document.getElementById('')
const contactDiv = document.getElementById('')

const itemList = document.getElementById('list')
const itemAdd = document.getElementById('add')
const itemContact = document.getElementById('contact')

const radix = 10;

function loadLocalStorage() {
  if (localStorage.getItem('book') === null) {
    localStorage.setItem('book', JSON.stringify([]));
    const data = localStorage.getItem('book');
    const bookStorage = JSON.parse(data);
    return bookStorage;
  }
  const data = localStorage.getItem('book');
  const bookStorage = JSON.parse(data);
  return bookStorage;
}

let storage = loadLocalStorage();

function updateLocalStorage() {
  localStorage.setItem('book', JSON.stringify(storage));
}

const renderBook = (book) => {
  const { id, title, author } = book;

  const renderContainer = document.createElement('tr');
  renderContainer.innerHTML = `
        <td>${id}</td>
        <td>${title}</td>
        <td>${author}</td>
        <td>
        <button class="bg-danger text-light border-0 d-block" type="button" onclick="removeBook('${book.id}')">Delete</button></td>
  `;
  return renderContainer;
};

const renderBooks = () => {
  const container = document.getElementById('ctn-book');
  container.innerHTML = '';
  if (storage !== null) {
    storage.forEach((book) => {
      container.appendChild(renderBook(book));
    });
  }
};

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  // Add book to storage
  static addBook(book) {
    storage.push(book);
    updateLocalStorage();
    renderBooks();
  }

  // Remove book from storage
  static removeBook(bookId) {
    const books = storage.filter((item) => item.id !== parseInt(bookId, radix));
    storage = books;
    updateLocalStorage();
    renderBooks();
  }
}


class Page {
  static setPage(page) {
    switch (page) {
      case 0:
        // code
        break;
      case 1:
        // code
        break;
      case 2:
        // code
        break;
    }
  }

  listPage() {
      // 1 - List is selected
      // 2 - We need to get data from storage and 
      // populate the list
  }

  formPage() {
    // 1 - Form is selected
    // 2 - We enter data in storage
  }
  contactPage() {
    // - Construct the dom
  }
}

function constructListPage(){}
function constructFormPage(){}
function constructContactPage(){}


function addBook(book) {
  Book.addBook(book);
}

function removeBook(bookId) {
  Book.removeBook(bookId);
}
removeBook();

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const id = storage.length + 1;
  const title = titleInput.value;
  const author = authorInput.value;
  const book = new Book(id, title, author);
  titleInput.value = '';
  authorInput.value = '';
  addBook(book);
  renderBooks();
});

renderBooks();
