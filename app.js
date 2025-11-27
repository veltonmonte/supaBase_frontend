const productList = document.querySelector('#products');

// ADD form
const addProductForm = document.querySelector('#add-product-form');
const addName = document.querySelector('#add-name');
const addPrice = document.querySelector('#add-price');
const addDescription = document.querySelector('#add-description');

// UPDATE form
const updateProductForm = document.querySelector('#update-product-form');
const updateProductId = document.querySelector('#update-id');
const updateProductName = document.querySelector('#update-name');
const updateProductPrice = document.querySelector('#update-price');
const updateProductDesc = document.querySelector('#update-description');

// SEARCH form
const searchForm = document.querySelector('#search-form');
const searchIdInput = document.querySelector('#search-id');
const searchResultDiv = document.querySelector('#search-result');


// ------------------------
// GET ALL PRODUCTS
// ------------------------
async function fetchProducts() {
  const response = await fetch('http://3.92.92.111:3000/products');
  const products = await response.json();

  productList.innerHTML = '';

  products.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${product.name}</strong><br>
      Preço: R$ ${product.price}<br>
      Descrição: ${product.description || "—"}<br>
    
    `;

    // DELETE button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Excluir';
    deleteButton.addEventListener('click', async () => {
      await deleteProduct(product.id);
      await fetchProducts();
    });

    // UPDATE button
    const updateButton = document.createElement('button');
    updateButton.innerHTML = 'Editar';
    updateButton.addEventListener('click', () => {
      updateProductId.value = product.id;
      updateProductName.value = product.name;
      updateProductPrice.value = product.price;
      updateProductDesc.value = product.description || "";
    });

    li.appendChild(updateButton);
    li.appendChild(deleteButton);

    productList.appendChild(li);
  });
}


// ------------------------
// ADD PRODUCT
// ------------------------
addProductForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = addName.value;
  const price = addPrice.value;
  const description = addDescription.value;

  await addProduct(name, price, description);

  addProductForm.reset();
  await fetchProducts();
});

async function addProduct(name, price, description) {
  const response = await fetch('http://3.92.92.111:3000/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price, description })
  });
  return response.json();
}


// ------------------------
// DELETE PRODUCT
// ------------------------
async function deleteProduct(id) {
  const response = await fetch(`http://3.92.92.111:3000/products/${id}`, {
    method: 'DELETE'
  });
  return response.json();
}


// ------------------------
// UPDATE PRODUCT
// ------------------------
updateProductForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = updateProductId.value;
  const name = updateProductName.value;
  const price = updateProductPrice.value;
  const description = updateProductDesc.value;

  await updateProduct(id, name, price, description);

  updateProductForm.reset();
  await fetchProducts();
});

async function updateProduct(id, name, price, description) {
  const response = await fetch(`http://3.92.92.111:3000/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price, description })
  });
  return response.json();
}


// ------------------------
// SEARCH PRODUCT BY ID
// ------------------------
searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = searchIdInput.value;

  const response = await fetch(`http://3.92.92.111:3000/products/${id}`);
  const product = await response.json();

  if (!product || !product.id) {
    searchResultDiv.innerHTML = `<p style="color:red">Produto não encontrado.</p>`;
    return;
  }

  searchResultDiv.innerHTML = `
    <p><strong>ID:</strong> ${product.id}</p>
    <p><strong>Nome:</strong> ${product.name}</p>
    <p><strong>Preço:</strong> R$ ${product.price}</p>
    <p><strong>Descrição:</strong> ${product.description || "—"}</p>
  `;
});


// LOAD PRODUCTS AT START
fetchProducts();

