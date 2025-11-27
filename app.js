const API_URL = "http://3.92.92.111:3000/products";

const productList = document.querySelector('#products');
const addProductForm = document.querySelector('#add-product-form');
const updateProductForm = document.querySelector('#update-product-form');
const updateProductId = document.querySelector('#update-id');
const updateProductName = document.querySelector('#update-name');
const updateProductPrice = document.querySelector('#update-price');

// Fetch products
async function fetchProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) throw new Error("Erro ao buscar produtos");

    const products = await response.json();
    productList.innerHTML = '';

    products.forEach(product => {
      const li = document.createElement('li');
      li.innerHTML = `${product.name} - R$${product.price}`;

      // Delete
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = async () => {
        await deleteProduct(product.id);
        fetchProducts();
      };

      // Update
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.onclick = () => {
        updateProductId.value = product.id;
        updateProductName.value = product.name;
        updateProductPrice.value = product.price;
      };

      li.appendChild(deleteButton);
      li.appendChild(updateButton);
      productList.appendChild(li);
    });

  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    alert("Erro ao carregar produtos! Verifique se a API está rodando.");
  }
}

// Add product
async function addProduct(name, price) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price })
    });

    if (!response.ok) throw new Error("Erro ao adicionar");

    return await response.json();

  } catch (error) {
    console.error(error);
    alert("Erro ao adicionar produto!");
  }
}

// Delete product
async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error("Erro ao deletar");

    return await response.json();

  } catch (error) {
    console.error(error);
    alert("Erro ao deletar produto!");
  }
}

// Add event
addProductForm.addEventListener('submit', async e => {
  e.preventDefault();
  const name = addProductForm.elements['name'].value;
  const price = addProductForm.elements['price'].value;

  await addProduct(name, price);
  addProductForm.reset();
  fetchProducts();
});

// Start
fetchProducts();
