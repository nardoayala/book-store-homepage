***REMOVED***
const nytimesUrl = "https://api.nytimes.com/svc/books/v3/lists.json";
***REMOVED***
const googleUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

async function getBestSellers(url, genre, apiKey) {
  const response = await fetch(
    url + "?list-name=" + genre + "&api-key=" + apiKey,
    { method: "get" }
  );
  const data = await response.json();
  return data.results;
}

// Uncomment to see avaliable lists
// (async function getList() {
//   const response = await fetch(
//     "https://api.nytimes.com/svc/books/v3/lists/names.json?list-name=&api-key=6AmUtE3Vuezd3dhhRUAIsG0QYmZJxHeE"
//   );
//   const data = await response.json();
//   console.log(data);
// })();

async function getThumbnails(url, isbn, apiKey) {
  const response = await fetch(url + isbn + "&key=" + apiKey, {
    method: "get",
  });
  const data = await response.json();
  if (data.items) {
    return data.items[0].volumeInfo.imageLinks.thumbnail;
  }
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

  const bookDetails = await getBestSellers(nytimesUrl, genre, nytimesApiKey);
  for (book in bookDetails) {
    let title = bookDetails[book].book_details[0].title;
    let author = bookDetails[book].book_details[0].author;
    let isbn = bookDetails[book].isbns[0].isbn13;
    let thumbnail = await getThumbnails(googleUrl, isbn, googleApiKey);
    let bookItem = document.createElement("div");
    bookItem.className = "book-item";
    bookItem.innerHTML = booksWrapTemplate(title, author, thumbnail);
    bestSellersWrap.appendChild(bookItem);
  }
}

renderBestSellers("nonfiction", "hardcover-nonfiction");
renderBestSellers("fiction", "hardcover-fiction");
renderBestSellers("science", "science");
