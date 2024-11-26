// Clock functionality
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById('clock').textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// Cart functionality
const productTable = document.getElementById('productTable');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

function updateRowTotal(row) {
  const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
  const rate = parseFloat(row.querySelector('.rate').textContent);
  const total = quantity * rate;
  row.querySelector('.total').value = total.toFixed(2);
}

function updateCartTotal() {
  let total = 0;
  let count = 0;
  
  productTable.querySelectorAll('tr').forEach(row => {
    if (row.querySelector('.product-select').checked) {
      total += parseFloat(row.querySelector('.total').value) || 0;
      count++;
    }
  });
  
  cartCount.textContent = count;
  cartTotal.textContent = total.toFixed(2);
}

// Event listeners
productTable.addEventListener('change', (e) => {
  if (e.target.classList.contains('quantity')) {
    const row = e.target.closest('tr');
    updateRowTotal(row);
    if (row.querySelector('.product-select').checked) {
      updateCartTotal();
    }
  }
  
  if (e.target.classList.contains('product-select')) {
    updateCartTotal();
  }
});

// Initialize
productTable.querySelectorAll('tr').forEach(row => {
  updateRowTotal(row);
});