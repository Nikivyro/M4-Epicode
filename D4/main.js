const base_url = `https://striveschool-api.herokuapp.com/books`;
const bookSection = document.getElementById('bookSection')
const totalCart = document.querySelector('#totalCart span');


function getBooks() {
    const allBookUrl = base_url
    const request = {
      method: 'GET',
    }
  
    fetch(allBookUrl, request)
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nella richiesta: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        // console.log(data)
        const books = data.map(
            (book) =>
              `<div class="col book_content mb-4">
                <div class="card" id="${book.asin}">
                  <a href="detail.html?q=${book.asin}&back=index.html"><img src="${book.img}" class="img-fluid object-fit-cover" alt="${book.title}"></a>
                  <div class="card-body">
                    <h3 class="h6 book_title my-3">${book.title}</h3>
                    <span>€ ${book.price}</span>
                    <hr>
                    <button onclick="addToCart('${book.asin}','${book.title}','${book.img}','${book.price}')" class="btn btn-success btn-sm addToCart"><i class="bi bi-cart me-1"></i> Aggiungi</button>
                    <button onclick="deleteBook('${book.asin}','${book.title}','${book.img}','${book.price}')" class="btn btn-danger btn-sm deleteBook"><i class="bi bi-x me-1"></i> Salta</button>
                  </div>
                </div>
              </div>`
        );
        bookSection.innerHTML = books.join("");
      })
      .catch(error => {
        console.error('Si è verificato un errore', error);
      });
}

/* Aggiungi al carrello */
const addToCart = (asin, title, img, price) => {
  const bookSelected = document.querySelector("[id='"+ asin +"']");
  
  bookSelected.style.border = '2px solid #8f8f8f';
  bookSelected.style.boxShadow = '0 .5rem 1rem rgba(0,0,0,.15)';
  
  const cartContainer = document.querySelector('#cartContainer');

  cartContainer.innerHTML += `
  <div class="cart_item d-flex align-items-center mb-3" id="cartitem${asin}">
    <img src="${img}" class="img-thumbnail w-25" alt="${title}">
    <span class="text-truncate small">${title}</span> - <span class="p-2 small">€ ${price}</span>
    <button class="btn btn-danger" onclick="removeToCart('${asin}','${price}')"><i class="bi bi-trash3"></i></button>
  </div>`

  countCart()

  totalCart.innerHTML = (Number(totalCart.innerHTML) + Number(price)).toFixed(2)
}

/* Rimouvi dal carrello */
const removeToCart = (asin, price) => {
  const bookSelected = document.querySelector("[id='"+ asin +"']");
  const bookInCartSelected = document.querySelector("[id='cartitem"+ asin +"']");

  bookSelected.style.border = 'none';
  bookSelected.style.boxShadow = 'none';

  bookInCartSelected.remove()

  countCart()

  totalCart.innerText = (Number(totalCart.innerText) - Number(price)).toFixed(2)
}

/* "Salta" libro */
const deleteBook = (asin) => {
  const bookSelected = document.querySelector("[id='"+ asin +"']");
  bookSelected.remove()
}

/* Svuota carrello */
const clearCart = () => {
  document.querySelectorAll('.cart_item').forEach((book) => book.remove());
  totalCart.innerText = 0
}

/* Counter carrello */
const countCart = () => {
    const counterSpan = document.getElementById("counterBooks");
    const counterSpanTop = document.getElementById("counterBooksTop");
    const books = document.getElementsByClassName('cart_item');
    let counter = books.length;
    counterSpan.innerHTML = counter;
    counterSpanTop.innerHTML = counter;
}

/* Ricerca libri */
const searchBooks = () => {
    const searchText = document.getElementById('searchText').value.toLowerCase();
    const titleBooks = document.querySelectorAll('.book_title');
    // const allBookTitle = Array.prototype.slice.call(titleBooks);
    const allBookTitle = Array.from(titleBooks)
    // console.log(allBookTitle);

    allBookTitle.filter((title) =>{
      const titleFiltered = title.innerText.toLowerCase().includes(searchText)
      const bookContent = title.closest('.book_content')
      if (!(titleFiltered)) {
        bookContent.classList.add('d-none')
      } else {
        bookContent.classList.remove('d-none')
      }
    })
}

getBooks()


document.getElementById("searchText").addEventListener("keydown", function (evt) {
  if (evt.key === "Enter") {
    searchBooks();
    }
});