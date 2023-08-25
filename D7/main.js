const URL = 'https://striveschool-api.herokuapp.com/api/product/'
const productsContainer = document.getElementById("productsResponse");

const getProducts = async () => {
    try {
      const response = await fetch(URL, {
        headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ODRmZGRmZmI4YjAwMTQ0MTNiYjEiLCJpYXQiOjE2OTI2OTc4NTQsImV4cCI6MTY5MzkwNzQ1NH0.G2_s4iExw1Z8ix0cWRpJBoNZ5SpbQmx5ekcQ6axKa2I"
        }
      });
      const products = await response.json();
      const allProducts = products.map(
        (product) =>
          `<div class="col-6 col-lg-4">
            <img src="${product.imageUrl}" class="img-fluid" alt="">
            <div class="card-body">
              <h3>${product.name}</h3>
              <span>${product.brand}</span>
              <p>${product.description}</p>
              <span>${product.price}</span>
              <a href="detail.html?q=${product._id}&back=index.html" title="${product.name}"><i class="bi bi-eye"></i></a>
            </div>
          </div>`
      );
      productsContainer.innerHTML = allProducts.join("");

    } catch (error) {
      errorMsg.innerHTML = "Inserire una selezione valida o riprovare compilando i campi richiesti.";
      productsContainer.appendChild(errorMsg);
  
      console.error("Errore durante la fetch o la ricerca:", error);
    }
}




getProducts()

