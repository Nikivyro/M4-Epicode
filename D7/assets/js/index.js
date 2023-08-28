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
          `<div class="col-6 col-lg-3 mb-4">
            <div class="card">
              <img src="${product.imageUrl}" class="img-fluid" alt="${product.name}">
              <div class="card-body">
                <h3 class="h5">${product.name}</h3>
                <span class="badge bg-primary">${product.brand}</span>
                <p class="text-truncate">${product.description}</p>
                <span class="h5 text-danger">€ ${product.price}</span>
                <a href="detail.html?q=${product._id}&back=index.html" title="${product.name}" class="float-end btn btn-primary btn-sm"><i class="bi bi-eye"></i> Guarda</a>
              </div>
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
