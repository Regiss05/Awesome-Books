const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const submitButton = document.getElementById('button');

const bookListDiv = document.getElementById('table');
const formDiv = document.getElementById('form');
const contactDiv = document.getElementById('contact');

const itemList = document.getElementById('li-list');
const itemAdd = document.getElementById('li-add');
const itemContact = document.getElementById('li-contact');

const dateElement = document.getElementById('date');

function formatAMPM(date) {
  // gets the hours
  let hours = date.getHours();
  // gets the month
  let minutes = date.getMinutes();
  // gets AM/PM
  const ampm = hours >= 12 ? 'pm' : 'am';
  // converts hours to 12 hour instead of 24 hour
  hours %= 12;
  // converts 0 (midnight) to 12
  hours = hours || 12; // the hour '0' should be '12'
  // converts minutes to have leading 0
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  // the time string
  const time = `${hours}:${minutes} ${ampm}`;

  // gets the match for the date string we want
  const match = date.toString().match(/\w{3} \w{3} \d{1,2} \d{4}/);

  // the result
  return `${match[0]} ${time}`;
}
const today = new Date();
dateElement.textContent = formatAMPM(today);

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

function constructListPage() {
  bookListDiv.style.display = 'block';
  formDiv.style.display = 'none';
  contactDiv.style.display = 'none';

  renderBooks();
}
function constructFormPage() {
  bookListDiv.style.display = 'none';
  formDiv.style.display = 'block';
  contactDiv.style.display = 'none';
}
function constructContactPage() {
  bookListDiv.style.display = 'none';
  formDiv.style.display = 'none';
  contactDiv.style.display = 'block';
}

function page(page) {
  switch (page) {
    case 0:
      constructListPage();
      break;
    case 1:
      constructFormPage();
      break;
    case 2:
      constructContactPage();
      break;
    default:
      break;
  }
}

function addBook(book) {
  Book.addBook(book);
}

function removeBook(bookId) {
  Book.removeBook(bookId);
}
removeBook();

itemList.addEventListener('click', () => {
  page(0);
});

itemAdd.addEventListener('click', () => {
  page(1);
});

itemContact.addEventListener('click', () => {
  page(2);
});

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

page(0);
renderBooks();
