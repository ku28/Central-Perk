// Get cart items from local storage
function getCartItems() {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
}

// Save cart items to local storage
function saveCartItems(cartItems) {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Update cart icon and total
function updateCartUI() {
  const cartItems = getCartItems();
  const cartPopup = document.getElementById('cart-popup');
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalSpan = document.getElementById('cart-total');
  
  // Clear cart items div
  cartItemsDiv.innerHTML = '';
  
  // Add cart items to the cart popup
  cartItems.forEach(item => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');
    cartItemDiv.innerText = item;
    cartItemsDiv.appendChild(cartItemDiv);
  });
  
  // Update cart total
  const cartTotal = cartItems.length;
  cartTotalSpan.innerText = cartTotal;
  
  // Show/hide cart popup
  if (cartTotal > 0) {
    cartPopup.style.display = 'block';
  } else {
    cartPopup.style.display = 'none';
  }
}

// Add item to cart
function addToCart(item) {
  const cartItems = getCartItems();
  cartItems.push(item);
  saveCartItems(cartItems);
  updateCartUI();
}

// Generate bill
function generateBill() {
  const cartItems = getCartItems();
  const totalAmount = cartItems.length * 100; // Assuming each item costs 100 units
  
  // Redirect to the bill page with the total amount
  window.location.href = `bill.html?total=${totalAmount}`;
}

// Handle add to cart button click
const addToCartButtons = document.getElementsByClassName('add-to-cart');
for (const button of addToCartButtons) {
  button.addEventListener('click', function(event) {
    const item = this.getAttribute('data-item');
    addToCart(item);
    event.preventDefault();
  });
}

// Handle generate bill button click
const generateBillButton = document.getElementById('generate-bill');
if (generateBillButton) {
  generateBillButton.addEventListener('click', function(event) {
    generateBill();
    event.preventDefault();
  });
}

// Initialize cart UI
updateCartUI();
