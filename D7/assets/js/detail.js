const prodContainer = document.getElementById('productDetail')
const urlParams = new URLSearchParams(window.location.search);
const ProdId = urlParams.get('q');
const backToIndex = urlParams.get('back');
document.getElementById("back").href=`${backToIndex}`; 

const productDetailUrl = `https://striveschool-api.herokuapp.com/api/product/${ProdId}`

const getProduct = async () => {
    try {
    const response = await fetch(productDetailUrl, {
        headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ODRmZGRmZmI4YjAwMTQ0MTNiYjEiLCJpYXQiOjE2OTI2OTc4NTQsImV4cCI6MTY5MzkwNzQ1NH0.G2_s4iExw1Z8ix0cWRpJBoNZ5SpbQmx5ekcQ6axKa2I"
        }
    });
    const product = await response.json();
        // console.log(book);
        document.title = `${product.name}`;
        prodContainer.innerHTML = `
        <div class="row row-cols-1 row-cols-lg-2">
            <div class="col-lg-4"><img src="${product.imageUrl}" class="img-fluid" alt="${product.name}"></div>
            <div class="col align-self-center ps-lg-4">
                <h1 class="display-3 fw-bold">${product.name}</h1>
                <span class="badge bg-primary mb-3">${product.brand}</span>
                <p>${product.description}</p>
                <span class="h2 text-danger">€ ${product.price}</span>
            </div>
        </div>
        `;
        
    } catch (error) {
        errorMsg.innerHTML = "Inserire una selezione valida o riprovare compilando i campi richiesti.";
        productsContainer.appendChild(errorMsg);
    
        console.error("Errore durante la fetch o la ricerca:", error);
    }
}

getProduct() 