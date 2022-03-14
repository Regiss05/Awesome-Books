const books = [
  {
    id: 1,
    name: 'Technology',
    description: 'lorem ipsum',
  },
  {
    id: 2,
    name: 'Calculus',
    description: 'lorem ipsum',
  },
];

const renderBook = (book) => {
  const {
    id,
    name,
    description,
  } = book;

  const renderContainer = document.createElement('div');
  renderContainer.setAttribute('data-id', id);
  renderContainer.innerHTML = `
            <h4>${name}</h4>
            <h5>${description}</h5>
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
  const container = document.querySelector('.book-programs');

  books.forEach((book) => {
    container.appendChild(renderBook(book));
  });
};

renderBooks();