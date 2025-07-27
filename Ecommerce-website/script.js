const products = [
  { name: "Product 1", price: 10.00, image: "https://via.placeholder.com/150" },
  { name: "Product 2", price: 15.00, image: "https://via.placeholder.com/150" },
  { name: "Product 3", price: 20.00, image: "https://via.placeholder.com/150" }
];
// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
  const saved = localStorage.getItem("cart");
  if (saved) {
    const parsed = JSON.parse(saved);
    cart.length = 0;
    cart.push(...parsed);
  }
}
const cart = [];
document.addEventListener("DOMContentLoaded", () => {
    const checkoutForm = document.getElementById("checkout-form");

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();

  if (name && email && address) {
    alert(`🎉 Thank you for your order, ${name}!`);
    cart.length = 0;
    saveCart();
    renderCart();
    checkoutForm.reset();
    document.getElementById("checkout-section").style.display = "none";
  }
});

    loadCart();  // Load saved cart on page load
  const productList = document.getElementById("product-list");
  const cartContainer = document.getElementById("cart-container");

  // Function to render the cart items on page
  function renderCart() {
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    // Build HTML for each item
    let html = "<ul>";
    cart.forEach((item, index) => {
      html += `
        <li>
          ${item.name} - 
          <button class="decrease-qty" data-index="${index}">−</button>
          <span> ${item.quantity} </span>
          <button class="increase-qty" data-index="${index}">+</button>
          = $${(item.price * item.quantity).toFixed(2)}
          <button class="remove-btn" data-index="${index}">Remove</button>
        </li>
      `;
    });
    html += "</ul>";
    // Calculate the total price
const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

// Add it to the HTML
html += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
    cartContainer.innerHTML = html;
  }

  function renderProducts() {
  productList.innerHTML = ""; // Clear existing products

  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}



  // Add to cart button handler
  productList.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
      const index = event.target.getAttribute("data-index");
      const product = products[index];
      const existingItem = cart.find(item => item.name === product.name);
if (existingItem) {
  existingItem.quantity += 1;
} else {
  cart.push({ ...product, quantity: 1 });
}

      console.log(`🛒 Added to cart: ${product.name}`);
      saveCart();
      renderCart();
    }
  });

  // Remove button handler (event delegation)
  cartContainer.addEventListener("click", (event) => {
  if (event.target.id === "checkout-btn") {
  document.getElementById("checkout-section").style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
}
    // Increase quantity
if (event.target.classList.contains("increase-qty")) {
  const index = event.target.getAttribute("data-index");
  cart[index].quantity += 1;
  saveCart();
  renderCart();
}

// Decrease quantity
if (event.target.classList.contains("decrease-qty")) {
  const index = event.target.getAttribute("data-index");
  cart[index].quantity -= 1;
  if (cart[index].quantity === 0) {
    cart.splice(index, 1); // Remove from cart
  }
  saveCart();
  renderCart();
}

    if (event.target.classList.contains("remove-btn")) {
      const index = event.target.getAttribute("data-index");
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }
  });

  // Initial render of cart
  renderCart();
  // Add total price and checkout button
const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
html += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
html += `<button id="checkout-btn">Checkout</button>`;

cartContainer.innerHTML = html;


});



