const API_URL = "http://18.206.193.243:3000/products";

// LISTAR PRODUTOS
async function fetchProducts() {
    const response = await fetch(API_URL);
    const products = await response.json();

    const list = document.getElementById("productList");
    list.innerHTML = "";

    products.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.id} - ${p.name} - R$ ${p.price}`;
        list.appendChild(li);
    });
}

// ADICIONAR PRODUTO
const addForm = document.getElementById("addProductForm");

addForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("addName").value;
    const price = document.getElementById("addPrice").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price })
    });

    fetchProducts();
});

// ATUALIZAR PRODUTO
const updateForm = document.getElementById("updateProductForm");

updateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("updateProductId").value;
    const name = document.getElementById("updateName").value;
    const price = document.getElementById("updatePrice").value;

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price })
    });

    fetchProducts();
});

// DELETAR PRODUTO
const deleteForm = document.getElementById("deleteProductForm");

deleteForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("deleteProductId").value;

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    fetchProducts();
});

// Carregar produtos ao iniciar
fetchProducts();



