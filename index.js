const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const submitButton = document.getElementById('button');

const radix = 10;

let bookStorage = {
  totalBook: 0,
  bookList: [],
};

function loadLocalStorage() {
  const data = localStorage.getItem('book');
  bookStorage = JSON.parse(data);
}

function createLocalStorage() {
  if (localStorage.getItem('book') === null) {
    localStorage.setItem('book', JSON.stringify(bookStorage));
    loadLocalStorage();
  } else {
    loadLocalStorage();
  }
}

function updateLocalStorage() {
  localStorage.setItem('book', JSON.stringify(bookStorage));
}

const renderBook = (book) => {
  const { id, title, author } = book;

  const renderContainer = document.createElement('tr');
  renderContainer.innerHTML = `
        <td>${id}</td>
        <td>${title}</td>
        <td>${author}</td>
  `;
  return renderContainer;
};

const renderBooks = () => {
  createLocalStorage();
  const container = document.getElementById('ctn-book');
  container.innerHTML = '';
  if (bookStorage.bookList !== null) {
    bookStorage.bookList.forEach((book) => {
      container.appendChild(renderBook(book));
    });
  }
};

function removeBook(bookId) {
  const books = bookStorage.bookList.filter((item) => item.id !== parseInt(bookId, radix));
  bookStorage.bookList = books;
  updateLocalStorage();
  renderBooks();
}

removeBook();

function addBook(book) {
  bookStorage.bookList.push(book);
  updateLocalStorage();
}

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  bookStorage.totalBook += 1;
  const book = {};
  book.id = bookStorage.totalBook;
  book.title = titleInput.value;
  book.author = authorInput.value;
  titleInput.value = '';
  authorInput.value = '';
  addBook(book);
  renderBooks();
});

renderBooks();
