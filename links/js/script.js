let Navbar = document.querySelector('.navbar');


document.querySelector('#bars-btn').onclick = () =>{
    Navbar.classList.toggle('active');
    SearchForm.classList.remove('active');
    CartItem.classList.remove('active');
}


let SearchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    SearchForm.classList.toggle('active');
    Navbar.classList.remove('active');
    CartItem.classList.remove('active');
}

let CartItem = document.querySelector('.items');

document.querySelector('#cart-btn').onclick = () =>{
    CartItem.classList.toggle('active');
    Navbar.classList.remove('active');
    SearchForm.classList.remove('active');
}
// Get the cart button and cart pop-up element
const cartButton = document.getElementById("cart-btn");
const cartPopup = document.getElementById("cart-popup");

// Get the items container
const itemsContainer = document.querySelector(".items");

// Get the cart items container and total element in the cart pop-up
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Initialize the cart items array
let cartItems = [];

// Add event listener to the cart button to show/hide the cart pop-up
cartButton.addEventListener("click", () => {
  cartPopup.classList.toggle("show");
});

// Add event listener to the add-to-cart buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the item details from the data-item attribute
    const item = button.getAttribute("data-item");
    const priceElement = button.previousElementSibling;
    const price = priceElement.textContent.trim();

    // Create a new item object
    const newItem = {
      item,
      price
    };

    // Add the item to the cart items array
    cartItems.push(newItem);

    // Update the cart items display
    updateCartItems();

    // Calculate and update the total price
    calculateTotal();

    // Show a confirmation message
    alert("Item added to cart!");
  });
});

// Function to update the cart items display
function updateCartItems() {
  // Clear the cart items container
  cartItemsContainer.innerHTML = "";

  // Create and append the cart item elements
  cartItems.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");
    cartItemElement.innerHTML = `
      <span class="item-name">${item.item}</span>
      <span class="item-price">${item.price}</span>
      <span class="remove-item" onclick="removeItem(${cartItems.indexOf(item)})">&times;</span>
    `;
    cartItemsContainer.appendChild(cartItemElement);
  });
}

// Function to calculate and update the total price
function calculateTotal() {
  let total = 0;

  cartItems.forEach((item) => {
    const price = parseFloat(item.price.replace("Rs.", "").trim());
    total += price;
  });

  cartTotal.textContent = `Rs.${total}`;
}

// Function to remove an item from the cart
function removeItem(index) {
  cartItems.splice(index, 1);
  updateCartItems();
  calculateTotal();
}