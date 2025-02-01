// Initialize cart as an empty array
let cart = [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  updateCart();
}

// Function to add item to the cart
function addToCart(productName, price) {
  const item = {
    name: productName,
    price: price,
    quantity: 1,
  };
  // Check if the item is already in the cart
  const existingItem = cart.find((product) => product.name === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(item);
  }
  updateCart();
}

// Function to remove item from the cart
function removeFromCart(productName) {
  cart = cart.filter((product) => product.name !== productName);
  updateCart();
}

// Function to update the cart display
function updateCart() {
  const cartTable = document.querySelector("#cart-table");
  const totalAmount = document.querySelector("#total-amount");
  let cartTotal = 0;

  cartTable.innerHTML = ""; // Clear existing cart items

  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td><input type="number" value="${item.quantity}" min="1" onchange="updateItemQuantity('${item.name}', this.value)"></td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td><button onclick="removeFromCart('${item.name}')">Remove</button></td>
    `;
    cartTable.appendChild(row);
    cartTotal += item.price * item.quantity;
  });

  totalAmount.textContent = `$${cartTotal.toFixed(2)}`;
  saveCart();
}

// Function to update the quantity of an item
function updateItemQuantity(productName, newQuantity) {
  const item = cart.find((product) => product.name === productName);
  if (item) {
    item.quantity = parseInt(newQuantity);
    updateCart();
  }
}

// Load cart on page load
document.addEventListener("DOMContentLoaded", loadCart);