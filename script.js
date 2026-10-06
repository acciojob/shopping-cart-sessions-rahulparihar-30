// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
    { id: 4, name: "Product 4", price: 40 },
    { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-cart-btn")



// Render product list
function renderProducts() {
    products.forEach((product) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${product.name} - $${product.price}
            <button class="add-to-cart-btn" data-id="${product.id}">
                Add to Cart
            </button>
        `;

        productList.appendChild(li);
    });
}


// Render cart list
function renderCart() {


    let cartItems = JSON.parse(sessionStorage.getItem("Cart")) || [];

    cartList.innerHTML = "";

    cartItems.forEach((item) => {

        // Find actual product using ID
        const product = products.find(product => product.id === item);

        const li = document.createElement("li");

        li.innerHTML = `
            ${product.name} - $${product.price}
            <button class="remove-cart-btn" data-id="${product.id}">
                Remove
            </button>
        `;

        cartList.appendChild(li);
    });
}


// Add item to cart
function addToCart(productId) {

    let cart = JSON.parse(sessionStorage.getItem("Cart")) || [];

    cart.push(productId);

    sessionStorage.setItem("Cart", JSON.stringify(cart));

    renderCart();
}


// Remove item from cart
function removeFromCart(productId) {

    let cart = JSON.parse(sessionStorage.getItem("Cart")) || [];

    cart = cart.filter(item => item !== productId);

    sessionStorage.setItem("Cart", JSON.stringify(cart));

    renderCart();
}


// Clear cart
function clearCart() {

    sessionStorage.removeItem("Cart");

    renderCart();
}


// Initial render
renderProducts();
renderCart();

productList.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart-btn")) {
        const productId = Number(event.target.dataset.id);

        addToCart(productId);
    }
});


cartList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-cart-btn")) {
        const productId = Number(event.target.dataset.id);

        removeFromCart(productId);
    }
});

clearBtn.addEventListener("click", (event)=>{
    clearCart()
})