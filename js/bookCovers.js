***REMOVED***
const url = "https://www.googleapis.com/books/v1/volumes?q=subject:";

async function getBooks(url, genre, apiKey) {
  const response = await fetch(
    url + genre + "&langRestrict=en&printType=books&key=" + apiKey
  );
  const data = await response.json();
  console.log(data.items);
  return data.items;
}

async function cacheExist(genre) {
  let listName = `${genre}List`;
  let cacheList = window.localStorage.getItem(listName);
  if (cacheList) {
    return JSON.parse(cacheList);
  }
  let bookDetails = await getBooks(url, genre, apiKey);
  window.localStorage.setItem(listName, JSON.stringify(bookDetails));
  return bookDetails;
}

function booksWrapTemplate(title, author, thumbnail) {
  return `<figure class="book-cover-container">
            <img class="book-cover" src=${thumbnail} alt="book cover">
            <div class="book-details">
              <p>${title}</p>
              <p>${author}</p>
              <p>Price</p>
            </div>
          </figure>
          <button class="btn" type="button" name="button">Add to Cart</button>`;
}

async function renderBestSellers(id, genre) {
  let bestSellersWrap = document.getElementById(id);

  const bookDetails = await cacheExist(genre);
  for (book in bookDetails) {
    const title = bookDetails[book].volumeInfo.title.toLowerCase();
    const author = bookDetails[book].volumeInfo.authors[0];
    const thumbnail = bookDetails[book].volumeInfo.imageLinks.thumbnail;
    let bookItem = document.createElement("div");
    bookItem.className = "book-item";
    bookItem.innerHTML = booksWrapTemplate(title, author, thumbnail);
    bestSellersWrap.appendChild(bookItem);
  }
}

renderBestSellers("nonfiction", "nonfiction");
renderBestSellers("fiction", "fiction");
renderBestSellers("mystery", "mystery");
