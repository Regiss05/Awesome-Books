let titleInput = document.getElementById("title");
let authorInput = document.getElementById("author");
let submitButton = document.getElementById("button");
let removeButton = document.getElementById("buttonR");

console.log("init");

// The localStorage object
let bookStorage = {
  totalBook: 0,
  bookList: [],
};

function createLocalStorage() {
  if (localStorage.getItem("book") === null) {
    localStorage.setItem("book", JSON.stringify(bookStorage));
    loadLocalStorage()
  } else {
    loadLocalStorage();
  }
}

function loadLocalStorage() {
  console.log("Loaded");
  let data = localStorage.getItem("book");
  bookStorage = JSON.parse(data);
}

function updateLocalStorage() {
  localStorage.setItem("book", JSON.stringify(bookStorage));
}

// Remove from books collection
function removeBook(bookId) {
  let books = bookStorage.bookList.filter((item) => item.id !== parseInt(bookId));
  bookStorage.bookList = books
  updateLocalStorage();
  renderBooks();
  console.log("books " + JSON.stringify(books));
}

// Add to books
function addBook(book) {
  console.log("id storage " + bookStorage.totalBook);
  bookStorage.bookList.push(book);
  updateLocalStorage();
  console.log("book " + JSON.stringify(book));
}

submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  bookStorage.totalBook++;
  let book = {};
  book.id = bookStorage.totalBook;
  book.title = titleInput.value;
  book.author = authorInput.value;
  addBook(book);
  renderBooks();
  
});

removeButton.addEventListener("click", function (e) {
  e.preventDefault();
  let book = {};
  book.id = 1;
  book.title = "";
  book.author = "";
  removeBook(book);
  renderBooks();
  
});

const renderBook = (book) => {
  const { id, title, author } = book;

  const renderContainer = document.createElement("div");
  renderContainer.setAttribute("data-id", id);
  renderContainer.innerHTML = `
            <h4>${title}</h4>
            <h5>${author}</h5>
            <button onclick="removeBook('${book.id}')">Remove</button>
            <hr>
  `;
  return renderContainer;
};

const renderBooks = () => {
  // const sectionContainer = document.createElement('section');
  // sectionContainer.classList.add('book-programs');
  // const titleSection = document.createElement('h1');
  // titleSection = 'kjkj';
  // sectionContainer.appendChild(titleSection);
  createLocalStorage();
  // let storage = JSON.parse(localStorage.getItem("book"));
  const container = document.querySelector(".book-programs");
  container.innerHTML = "";
  if (bookStorage.bookList !== null) {
    bookStorage.bookList.forEach((book) => {
      container.appendChild(renderBook(book));
    });
  }
};

renderBooks();
