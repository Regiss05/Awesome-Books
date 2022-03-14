let titleInput = document.getElementById("title");
let authorInput = document.getElementById("author");
let submitButton = document.getElementById("button");

let book = {
  id: 0,
  title: "",
  author: "",
};

let books = [];

let bookStorage = {
  totalBook: 0,
  books: books,
};

function createLocalStorage() {
  if (localStorage.getItem("book") === null) {
    localStorage.setItem("book", JSON.stringify(bookStorage));
  } else {
    loadLocalStorage();
  }
}

function loadLocalStorage() {
  let data = localStorage.getItem("book");
  bookStorage = JSON.parse(data);
  books = bookStorage.books;
  showBooks();
}

function remove(book) {
  return books.filter((item) => item !== book);
}

function add(book) {
  bookStorage.totalBook++;
  console.log('id storage ' + bookStorage.totalBook)
  return books.push(book);
}

function showBooks() {
  return bookCollection.sort(function (a, b) {
    return a.id - b.id;
  });
}

submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  book.id = bookStorage.totalBook;
  book.title = titleInput.value;
  book.author = authorInput.value;
  add(book)
  renderBooks();
  console.log(book); 
});

const renderBook = (book) => {
  const { id, title, author } = book;

  const renderContainer = document.createElement("div");
  renderContainer.setAttribute("data-id", id);
  renderContainer.innerHTML = `
            <h4>${title}</h4>
            <h5>${author}</h5>
            <button>Remove</button>
            <hr>
  `;
  return renderContainer;
};

const renderBooks = () => {
  //   const sectionContainer = document.createElement('section');
  //   sectionContainer.classList.add('book-programs');
  //   const titleSection = document.createElement('h1');
  //   titleSection = 'kjkj';
  //   sectionContainer.appendChild(titleSection);
  const container = document.querySelector(".book-programs");

  books.forEach((book) => {
    container.appendChild(renderBook(book));
  });
};

renderBooks();
