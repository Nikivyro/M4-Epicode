let deleteProductId = null;

const titleForm = document.getElementById("titleForm");
const productForm = document.getElementById("product-form");
const productNameInput = document.getElementById("product-name");
const productDescInput = document.getElementById("product-desc");
const productBrandInput = document.getElementById("product-brand");
const productImgInput = document.getElementById("product-img");
const productPriceInput = document.getElementById("product-price");
const productIdInput = document.getElementById("product-id");
const productTable = document.getElementById("productsResponse");

function showSpinner() {
    document.querySelector('.spinner-border').classList.add('d-block')
    document.querySelector('.spinner-border').classList.remove('d-none')
}
function hideSpinner() {
    document.querySelector('.spinner-border').classList.add('d-none')
    document.querySelector('.spinner-border').classList.remove('d-block')
}

productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = productNameInput.value;
    const description = productDescInput.value;
    const brand = productBrandInput.value;
    const imageUrl = productImgInput.value;
    const price = parseFloat(productPriceInput.value);
    const id = productIdInput.value;

    if (id) {
        await updateProduct(id, name, description, brand, imageUrl, price);
    } else {
        await createProduct(name, description, brand, imageUrl, price);
    }

    productNameInput.value = "";
    productDescInput.value = "";
    productBrandInput.value = "";
    productImgInput.value = "";
    productPriceInput.value = "";
    productIdInput.value = "";

    await getProducts();
});

async function createProduct(name, description, brand, imageUrl, price) {
    showSpinner()
    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ODRmZGRmZmI4YjAwMTQ0MTNiYjEiLCJpYXQiOjE2OTI2OTc4NTQsImV4cCI6MTY5MzkwNzQ1NH0.G2_s4iExw1Z8ix0cWRpJBoNZ5SpbQmx5ekcQ6axKa2I"
            },
            body: JSON.stringify({ name, description, brand, imageUrl, price }),
        });
        titleForm.innerHTML = 'Aggiungi un prodotto'
        // if (response.ok) {
        //     console.log("Prodotto creato correttamente");
        // }
    } catch (error) {
        console.error("Errore nella creazione del prodotto" , error);
    } finally{
        hideSpinner()
        titleForm.innerHTML = 'Aggiungi un nuovo prodotto'
    }
}

async function updateProduct(id, name, description, brand, imageUrl, price) {            
    showSpinner()
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ODRmZGRmZmI4YjAwMTQ0MTNiYjEiLCJpYXQiOjE2OTI2OTc4NTQsImV4cCI6MTY5MzkwNzQ1NH0.G2_s4iExw1Z8ix0cWRpJBoNZ5SpbQmx5ekcQ6axKa2I"
            },
            body: JSON.stringify({ name, description, brand, imageUrl, price }),
        });                
    } catch (error) {
        console.error("Errore nella modifica del prodotto", error);
    } finally {
        hideSpinner()
        titleForm.innerHTML = 'Aggiungi un nuovo prodotto'
    }
    
}

async function getProducts() {
    showSpinner()
    productTable.innerHTML = "";

    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/",{
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ODRmZGRmZmI4YjAwMTQ0MTNiYjEiLCJpYXQiOjE2OTI2OTc4NTQsImV4cCI6MTY5MzkwNzQ1NH0.G2_s4iExw1Z8ix0cWRpJBoNZ5SpbQmx5ekcQ6axKa2I"
            },
        });
        const products = await response.json();

        products.forEach(product => {
            const productItem = document.createElement("tr");
            productItem.innerHTML = `
                <th><img src="${product.imageUrl}" class="img-fluid w-50" alt="${product.name}"></th>
                <th>${product.name}</th>
                <th>${product.description}</th>
                <th>${product.brand}</th>
                <th>€ ${product.price}</th>
                <th>
                    <button class="btn btn-primary" onclick="editProduct('${product._id}', '${product.name}', '${product.description}', '${product.brand}', '${product.imageUrl}', ${product.price})"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger" onclick="deleteProduct('${product._id}')"><i class="bi bi-trash3"></i></button>                            
                </th>
            `;
            productTable.appendChild(productItem);
        });                
    } catch (error) {
        console.error("Errore nel recupero dei prodotti", error);
    } finally {
        hideSpinner()
    }

}

async function deleteProduct(id) {
    deleteProductId = id;
    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    confirmDeleteButton.addEventListener("click", confirmDelete);
    const confirmDeleteModal = new bootstrap.Modal(document.getElementById("confirmDeleteModal"));
    confirmDeleteModal.show();
}

async function confirmDelete() {
    const id = deleteProductId;
    if (id) {
        showSpinner();
        try {
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ODRmZGRmZmI4YjAwMTQ0MTNiYjEiLCJpYXQiOjE2OTI2OTc4NTQsImV4cCI6MTY5MzkwNzQ1NH0.G2_s4iExw1Z8ix0cWRpJBoNZ5SpbQmx5ekcQ6axKa2I"
                },
            });
            // console.log("Product deleted successfully");
            await getProducts();
        } catch (error) {
            console.error("Prodotto non eliminato:", error);
        } finally {
            hideSpinner();
            deleteProductId = null;
        }
    }
    const confirmDeleteModal = new bootstrap.Modal(document.getElementById("confirmDeleteModal"));
    confirmDeleteModal.hide();
}

function editProduct(id, name, description, brand, imageUrl, price) {
    productIdInput.value = id;
    productNameInput.value = name;
    productDescInput.value = description;
    productBrandInput.value = brand;
    productImgInput.value = imageUrl;
    productPriceInput.value = price;
    titleForm.innerHTML = `Stai modificando ${name}`
}

function clearForm() {
    productIdInput.value = '';
    productNameInput.value = '';
    productDescInput.value = '';
    productBrandInput.value = '';
    productImgInput.value = '';
    productPriceInput.value = '';
    titleForm.innerHTML = `Aggiungi un nuovo prodotto`
    productForm.scrollIntoView();
    productNameInput.focus();
}

getProducts();

document.addEventListener("DOMContentLoaded", () => {
    new bootstrap.Modal(document.getElementById("confirmDeleteModal"));
});
