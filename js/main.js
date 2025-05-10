const cartCountElements = document.querySelectorAll('.cart-count');
const featuredProductsContainer = document.getElementById('featured-products');
const newArrivalsContainer = document.getElementById('new-arrivals');

// Cart Functionality
let cart = [];

// Load cart from local storage
function loadCart() {
  const savedCart = localStorage.getItem('tech_store_cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
  }
}

// Save cart to local storage
function saveCart() {
  localStorage.setItem('tech_store_cart', JSON.stringify(cart));
  updateCartCount();
}

// Add product to cart
function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  
  if (!product) return;
  
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      product
    });
  }
  
  saveCart();
  showToast(`${product.name} added to cart`);
}

// Update cart item quantity
function updateCartItemQuantity(productId, quantity) {
  const itemIndex = cart.findIndex(item => item.productId === productId);
  
  if (itemIndex === -1) return;
  
  if (quantity <= 0) {
    cart.splice(itemIndex, 1);
  } else {
    cart[itemIndex].quantity = quantity;
  }
  
  saveCart();
}

// Remove item from cart
function removeFromCart(productId) {
  const itemIndex = cart.findIndex(item => item.productId === productId);
  
  if (itemIndex === -1) return;
  
  const product = cart[itemIndex].product;
  cart.splice(itemIndex, 1);
  
  saveCart();
  showToast(`${product.name} removed from cart`);
}

// Update cart count in UI
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  cartCountElements.forEach(element => {
    element.textContent = totalItems;
  });
}

// Calculate cart total
function calculateCartTotal() {
  return cart.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
}

// Show toast notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Create product card
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  
  card.innerHTML = `
    <div class="product-image">
      <img src="${product.imageUrl}" alt="${product.name}">
      ${!product.inStock ? '<span class="product-badge">Out of Stock</span>' : ''}
      <div class="product-actions">
        <button class="action-btn add-to-cart" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
          <i class="fas fa-shopping-cart"></i>
        </button>
        <a href="product-details.html?id=${product.id}" class="action-btn">
          <i class="fas fa-eye"></i>
        </a>
      </div>
    </div>
    <div class="product-info">
      <div class="product-category">${product.category}</div>
      <h3 class="product-name">${product.name}</h3>
      <div class="product-rating">
        <div class="stars">
          ${createStarRating(product.rating)}
        </div>
        <span class="rating-count">(${product.rating.toFixed(1)})</span>
      </div>
      <div class="product-price">$${formatPrice(product.price)}</div>
    </div>
    <div class="product-footer">
      <button class="btn btn-primary add-to-cart" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
        Add to Cart
      </button>
    </div>
  `;
  
  const addToCartButtons = card.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = parseInt(button.getAttribute('data-id'));
      addToCart(productId);
    });
  });
  
  return card;
}

// Create new arrival item 
function createNewArrivalItem(product) {
  const item = document.createElement('div');
  item.className = 'new-arrival-item';
  
  item.innerHTML = `
    <a href="product-details.html?id=${product.id}">
      <img src="${product.imageUrl}" alt="${product.name}">
      <div class="new-arrival-overlay">
        <h3 class="new-arrival-name">${product.name}</h3>
        <p class="new-arrival-price">$${formatPrice(product.price)}</p>
      </div>
    </a>
  `;
  
  return item;
}

// Create star rating display
function createStarRating(rating) {
  let stars = '';
  
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += '<i class="fas fa-star"></i>';
    } else if (i - 0.5 <= rating) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }
  
  return stars;
}

// Initialize home page
function initHomePage() {
  // Load featured products
  if (featuredProductsContainer) {
    const featuredProducts = getFeaturedProducts();
    
    featuredProducts.forEach(product => {
      const card = createProductCard(product);
      featuredProductsContainer.appendChild(card);
    });
  }
  
  // Load new arrivals
  if (newArrivalsContainer) {
    const newArrivals = getNewArrivals();
    
    newArrivals.forEach(product => {
      const item = createNewArrivalItem(product);
      newArrivalsContainer.appendChild(item);
    });
  }
}

// Initialize products page
function initProductsPage() {
  const productGrid = document.getElementById('product-grid');
  const categoryFilter = document.getElementById('category-filter');
  const searchInput = document.getElementById('search-input');
  
  if (!productGrid) return;
  
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const searchParam = urlParams.get('search');
  
  // Apply initial filters
  let filteredProducts = products;
  
  if (categoryParam) {
    filteredProducts = getProductsByCategory(categoryParam);
    if (categoryFilter) {
      categoryFilter.value = categoryParam;
    }
  }
  
  if (searchParam) {
    filteredProducts = searchProducts(searchParam);
    if (searchInput) {
      searchInput.value = searchParam;
    }
  }
  
  // Display products
  displayProducts(filteredProducts, productGrid);
  
  // Set up filter listeners
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterProducts);
  }
  
  if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
  }
  
  function filterProducts() {
    const category = categoryFilter ? categoryFilter.value : '';
    const searchTerm = searchInput ? searchInput.value : '';
    
    let filtered = products;
    
    if (category) {
      filtered = getProductsByCategory(category);
    }
    
    if (searchTerm) {
      filtered = searchProducts(searchTerm);
      if (category) {
        filtered = filtered.filter(product => product.category === category);
      }
    }
    
    displayProducts(filtered, productGrid);
  }
  
  function displayProducts(products, container) {
    container.innerHTML = '';
    
    if (products.length === 0) {
      container.innerHTML = '<p class="no-products">No products found matching your criteria.</p>';
      return;
    }
    
    products.forEach(product => {
      const card = createProductCard(product);
      container.appendChild(card);
    });
  }
}

// Initialize product details page
function initProductDetailsPage() {
  const productContainer = document.getElementById('product-details');
  const relatedProductsContainer = document.getElementById('related-products');
  
  if (!productContainer) return;
  
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  if (!productId) {
    window.location.href = 'products.html';
    return;
  }
  
  const product = getProductById(parseInt(productId));
  
  if (!product) {
    window.location.href = 'products.html';
    return;
  }
  
  // Display product details
  displayProductDetails(product, productContainer);
  
  // Display related products
  if (relatedProductsContainer) {
    const relatedProducts = getRelatedProducts(product.category, product.id);
    
    relatedProducts.forEach(product => {
      const card = createProductCard(product);
      relatedProductsContainer.appendChild(card);
    });
  }
  
  function displayProductDetails(product, container) {
    // Set page title
    document.title = `${product.name} - TechStore`;
    
    container.innerHTML = `
      <div class="product-details-container">
        <div class="product-gallery">
          <img src="${product.imageUrl}" alt="${product.name}" class="main-image">
        </div>
        
        <div class="product-info-container">
          <div class="breadcrumbs">
            <a href="index.html">Home</a> &gt;
            <a href="products.html?category=${product.category}">${product.category}</a> &gt;
            <span>${product.name}</span>
          </div>
          
          <h1 class="product-title">${product.name}</h1>
          
          <div class="product-meta">
            <div class="product-rating">
              <div class="stars">
                ${createStarRating(product.rating)}
              </div>
              <span class="rating-count">${product.rating.toFixed(1)} (Customer Reviews)</span>
            </div>
            
            <div class="product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}">
              ${product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
          </div>
          
          <div class="product-price">$${formatPrice(product.price)}</div>
          
          <div class="product-description">
            ${product.description}
          </div>
          
          <div class="product-features">
            <h3>Key Features</h3>
            <ul>
              ${product.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
          
          <div class="product-actions">
            <div class="quantity-selector">
              <button class="quantity-btn minus">-</button>
              <input type="number" value="1" min="1" max="10" class="quantity-input">
              <button class="quantity-btn plus">+</button>
            </div>
            
            <button class="btn btn-primary add-to-cart-large" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
            

            
          </div>
          
          <div class="product-actions-secondary">
            <button class="btn btn-outline">
              <i class="far fa-heart"></i> Add to Wishlist
            </button>
            <button class="btn btn-outline">
              <i class="fas fa-share-alt"></i> Share
            </button>
            <button class="btn btn-primary add-to-cart-large" data-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div class="product-tabs">
        <div class="tabs-header">
          <button class="tab-btn active" data-tab="description">Description</button>
          <button class="tab-btn" data-tab="specifications">Specifications</button>
          <button class="tab-btn" data-tab="reviews">Reviews</button>
        </div>
        
        <div class="tabs-content">
          <div class="tab-panel active" id="description">
            <p>${product.description}</p>
            <div class="product-features">
              <h3>Features</h3>
              <ul>
                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            </div>
          </div>
          
          <div class="tab-panel" id="specifications">
            <table class="specs-table">
              <tbody>
                ${Object.entries(product.specs).map(([key, value]) => `
                  <tr>
                    <th>${key}</th>
                    <td>${value}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <div class="tab-panel" id="reviews">
            <div class="reviews-summary">
              <div class="average-rating">
                <div class="rating-number">${product.rating.toFixed(1)}</div>
                <div class="stars">
                  ${createStarRating(product.rating)}
                </div>
                <div class="rating-count">Based on customer reviews</div>
            
            <div class="reviews-list">
              <p>No reviews yet. Be the first to review this product!</p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Set up tabs functionality
    const tabButtons = container.querySelectorAll('.tab-btn');
    const tabPanels = container.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // Toggle active state on buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Toggle active state on panels
        tabPanels.forEach(panel => panel.classList.remove('active'));
        document.getElementById(tabName).classList.add('active');
      });
    });
    
    // Quantity selector functionality
    const quantityInput = container.querySelector('.quantity-input');
    const minusBtn = container.querySelector('.quantity-btn.minus');
    const plusBtn = container.querySelector('.quantity-btn.plus');
    
    minusBtn.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
    
    plusBtn.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
      }
    });
    
    // Add to cart functionality
    const addToCartBtn = container.querySelector('.add-to-cart-large');
    
    addToCartBtn.addEventListener('click', () => {
      const quantity = parseInt(quantityInput.value);
      addToCart(product.id, quantity);
    });
  }
}

// Initialize categories page
function initCategoriesPage() {
  const categoriesContainer = document.getElementById('categories-container');
  
  if (!categoriesContainer) return;
  
  CATEGORIES.forEach(category => {
    const categoryProducts = getProductsByCategory(category);
    const productCount = categoryProducts.length;
    
    const categoryCard = document.createElement('div');
    categoryCard.className = 'category-large-card';
    
    categoryCard.innerHTML = `
      <a href="products.html?category=${category}">
        <div class="category-icon">
          <i class="fas ${getCategoryIcon(category)}"></i>
        </div>
        <h3>${category}</h3>
        <p>${productCount} Products</p>
      </a>
    `;
    
    categoriesContainer.appendChild(categoryCard);
  });
  
  function getCategoryIcon(category) {
    switch(category) {
      case 'Smartphones': return 'fa-mobile-alt';
      case 'Laptops': return 'fa-laptop';
      case 'Tablets': return 'fa-tablet-alt';
      case 'Smartwatches': return 'fa-clock';
      case 'Headphones': return 'fa-headphones';
      case 'Cameras': return 'fa-camera';
      case 'Accessories': return 'fa-plug';
      case 'Gaming': return 'fa-gamepad';
      default: return 'fa-box';
    }
  }
}

// Initialize cart page
function initCartPage() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSummaryContainer = document.getElementById('cart-summary');
  
  if (!cartItemsContainer || !cartSummaryContainer) return;
  
  function displayCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-cart"></i>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <a href="products.html" class="btn btn-primary">Browse Products</a>
        </div>
      `;
      
      cartSummaryContainer.innerHTML = `
        <div class="cart-summary-empty">
          <h3>Summary</h3>
          <p>Add products to your cart to see the summary.</p>
        </div>
      `;
      
      return;
    }
    
    // Display cart items
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      
      cartItem.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.product.imageUrl}" alt="${item.product.name}">
        </div>
        
        <div class="cart-item-details">
          <h3 class="cart-item-name">
            <a href="product-details.html?id=${item.product.id}">${item.product.name}</a>
          </h3>
          <div class="cart-item-category">${item.product.category}</div>
          <div class="cart-item-price">$${formatPrice(item.product.price)}</div>
        </div>
        
        <div class="cart-item-quantity">
          <button class="quantity-btn minus" data-id="${item.productId}">-</button>
          <input type="number" value="${item.quantity}" min="1" max="10" class="quantity-input" data-id="${item.productId}">
          <button class="quantity-btn plus" data-id="${item.productId}">+</button>
        </div>
        
        <div class="cart-item-subtotal">
          $${formatPrice(item.product.price * item.quantity)}
        </div>
        
        <button class="cart-item-remove" data-id="${item.productId}">
          <i class="fas fa-trash-alt"></i>
        </button>
      `;
      
      cartItemsContainer.appendChild(cartItem);
    });
    
    // Setup quantity buttons
    const minusBtns = document.querySelectorAll('.quantity-btn.minus');
    const plusBtns = document.querySelectorAll('.quantity-btn.plus');
    const quantityInputs = document.querySelectorAll('.cart-item-quantity .quantity-input');
    const removeButtons = document.querySelectorAll('.cart-item-remove');
    
    minusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = parseInt(btn.getAttribute('data-id'));
        const item = cart.find(item => item.productId === productId);
        
        if (item && item.quantity > 1) {
          updateCartItemQuantity(productId, item.quantity - 1);
          displayCart();
        }
      });
    });
    
    plusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = parseInt(btn.getAttribute('data-id'));
        const item = cart.find(item => item.productId === productId);
        
        if (item && item.quantity < 10) {
          updateCartItemQuantity(productId, item.quantity + 1);
          displayCart();
        }
      });
    });
    
    quantityInputs.forEach(input => {
      input.addEventListener('change', () => {
        const productId = parseInt(input.getAttribute('data-id'));
        const quantity = parseInt(input.value);
        
        if (quantity >= 1 && quantity <= 10) {
          updateCartItemQuantity(productId, quantity);
          displayCart();
        }
      });
    });
    
    removeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = parseInt(btn.getAttribute('data-id'));
        removeFromCart(productId);
        displayCart();
      });
    });
    
    // Display cart summary
    const subtotal = calculateCartTotal();
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.07; // 7% tax
    const total = subtotal + shipping + tax;
    
    cartSummaryContainer.innerHTML = `
      <div class="cart-summary-content">
        <h3>Order Summary</h3>
        
        <div class="summary-item">
          <span>Subtotal</span>
          <span>$${formatPrice(subtotal)}</span>
        </div>
        
        <div class="summary-item">
          <span>Shipping</span>
          <span>${shipping === 0 ? 'FREE' : '$' + formatPrice(shipping)}</span>
        </div>
        
        <div class="summary-item">
          <span>Tax (7%)</span>
          <span>$${formatPrice(tax)}</span>
        </div>
        
        <div class="summary-total">
          <span>Total</span>
          <span>$${formatPrice(total)}</span>
        </div>
        
        <button class="btn btn-primary checkout-btn">
          Proceed to Checkout
        </button>
        
        <div class="summary-note">
          <p>Free shipping on orders over $50</p>
          <p>30-day easy returns</p>
        </div>
      </div>
    `;
  }
  
  // Initial display
  displayCart();
}

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const header = document.querySelector('.header'); // Select the header
    if (!mobileMenuBtn || !header) return;
    mobileMenuBtn.addEventListener('click', () => {
        console.log('Mobile menu button clicked'); // Debug log
        header.classList.toggle('mobile-menu-open'); // Toggle the class on the header
    });
}
// Call the function on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
});







// Search functionality
function initSearch() {
  const searchForms = document.querySelectorAll('form.search-form');
  
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const input = form.querySelector('input[type="search"], input[type="text"]');
      const searchTerm = input.value.trim();
      

      });
  });
}

// Page initialization
document.addEventListener('DOMContentLoaded', () => {
  // Load cart from local storage
  loadCart();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize search functionality
  initSearch();
  
  // Page specific initialization
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  switch (currentPage) {
    case 'index.html':
      initHomePage();
      break;
    case 'products.html':
      initProductsPage();
      break;
    case 'product-details.html':
      initProductDetailsPage();
      break;
    case 'categories.html':
      initCategoriesPage();
      break;
    case 'cart.html':
      initCartPage();
      break;
  }
  
  // Attach event listener for storage events (multi-tab support)
  window.addEventListener('storage', (e) => {
    if (e.key === 'tech_store_cart') {
      loadCart();
      
      // Reload cart page if currently viewing
      if (currentPage === 'cart.html') {
        initCartPage();
      }
    }
  });
});

// Add toast styling
const style = document.createElement('style');
style.textContent = `
  .toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--primary-color);
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transform: translateY(100px);
    opacity: 0;
    transition: transform 0.3s, opacity 0.3s;
  }
  
  .toast.show {
    transform: translateY(0);
    opacity: 1;
  }
`;

document.head.appendChild(style);