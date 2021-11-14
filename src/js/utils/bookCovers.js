const url = "https://www.googleapis.com/books/v1/volumes?q=subject:";

async function getBooks(url, genre) {
  const response = await fetch(
    url + genre + "&langRestrict=en" + "&printType=books"
  );
  const data = await response.json();
  return data.items;
}

async function cacheExist(genre) {
  let listName = `${genre}List`;
  let cacheList = window.localStorage.getItem(listName);
  if (cacheList) {
    return JSON.parse(cacheList);
  }
  let bookDetails = await getBooks(url, genre);
  window.localStorage.setItem(listName, JSON.stringify(bookDetails));
  return bookDetails;
}

function booksWrapTemplate(title, author, thumbnail) {
  const view = `
    <figure class="book-cover-container">
      <img class="book-cover" src=${thumbnail} alt="book cover">
      <div class="book-details">
        <p class="book-details__title">${title}</p>
        <p class="book-details__author">${author}</p>
        <p class="book-details__price">Price</p>
      </div>
    </figure>
    <button class="btn" type="button" name="button">Add to Cart</button>
  `
  return view;
}

async function renderBooksWrap(id, genre) {
  let booksWrap = document.getElementById(id);

  const bookDetails = await cacheExist(genre);

  bookDetails.forEach(element => {
    const {
      title,
      author,
      imageLinks: { thumbnail },
    } = element.volumeInfo;

    let bookItem = document.createElement("div");
    bookItem.className = "book-item";
    bookItem.innerHTML = booksWrapTemplate(title, author, thumbnail);
    booksWrap.appendChild(bookItem);
  });
}

renderBooksWrap("nonfiction", "nonfiction");
renderBooksWrap("fiction", "fiction");
renderBooksWrap("mystery", "mystery");
