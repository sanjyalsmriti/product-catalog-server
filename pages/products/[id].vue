<template>
  <div class="container">
    <!-- Back to products link -->
    <NuxtLink to="/" class="back-link">
      ← Back to Products
    </NuxtLink>

    <!-- Loading State -->
    <div v-if="pending" class="loading">
      <div class="spinner"></div>
      <p>Loading product details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error">
      <h2>Product Not Found</h2>
      <p>{{ error.message }}</p>
      <NuxtLink to="/" class="btn-primary">Return to Home</NuxtLink>
    </div>

    <!-- Product Details -->
    <div v-else-if="product" class="product-details">
      
      <!-- Product Image -->
      <div class="product-image-container">
        <NuxtImg 
          :src="product.image" 
          :alt="product.name"
          class="product-image"
          format="webp"
          quality="80"
          width="600"
          height="600"
        />
      </div>

      <!-- Product Information -->
      <div class="product-info">
        <div class="product-category">{{ product.category }}</div>
        <h1 class="product-name">{{ product.name }}</h1>
        
        <!-- Star Rating -->
        <div class="product-rating">
          <span class="stars">
            <span 
              v-for="i in 5" 
              :key="i" 
              class="star" 
              :class="{ filled: i <= Math.round(product.rating) }"
            >
              ★
            </span>
          </span>
          <span class="rating-value">{{ product.rating }}</span>
        </div>

        <p class="product-description">{{ product.description }}</p>

        <!-- Product Features List -->
        <div v-if="product.features" class="product-features">
          <h3>Key Features:</h3>
          <ul>
            <li v-for="(feature, index) in product.features" :key="index">
              {{ feature }}
            </li>
          </ul>
        </div>

        <!-- Stock Information -->
        <div class="product-meta">
          <div class="stock-info" :class="{ 'low-stock': product.stock < 30 }">
            {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
          </div>
        </div>

        <!-- Price -->
        <div class="product-price">${{ product.price.toFixed(2) }}</div>

        <!-- Add to Cart Section -->
        <div class="product-actions">
          <!-- Quantity Selector -->
          <div class="quantity-selector">
            <button @click="decreaseQuantity" class="qty-btn">-</button>
            <input v-model.number="quantity" type="number" min="1" :max="product.stock" class="qty-input">
            <button @click="increaseQuantity" class="qty-btn">+</button>
          </div>

          <!-- Add to Cart Button -->
          <button 
            @click="addProductToCart" 
            :disabled="product.stock === 0"
            class="btn-add-to-cart"
          >
            {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
          </button>
        </div>

        <!-- Success Message (shows after adding to cart) -->
        <div v-if="showSuccess" class="success-message">
          ✓ Added to cart successfully!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import types
import type { ProductWithFeatures } from '~/types';

// Get access to route and cart store
const route = useRoute();
const cartStore = useCartStore();

// Reactive variables
const quantity = ref(1); // How many items to add
const showSuccess = ref(false); // Show success message

// Get the product ID from the URL
const productId = computed(() => parseInt(route.params.id as string));

// Fetch product data from API (runs on server first - SSR)
const { data: product, pending, error } = await useAsyncData<ProductWithFeatures>(
  `product-${productId.value}`,
  () => $fetch<ProductWithFeatures>(`/api/products/${productId.value}`)
);

// Increase quantity
const increaseQuantity = () => {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value = quantity.value + 1;
  }
};

// Decrease quantity
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value = quantity.value - 1;
  }
};

// Add product to cart
const addProductToCart = () => {
  if (product.value) {
    // Call the store action to add to cart
    cartStore.addToCart(product.value, quantity.value);
    
    // Show success message
    showSuccess.value = true;
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  }
};

// Set SEO meta tags dynamically based on product
useHead(() => ({
  title: product.value ? `${product.value.name} - Product Catalog` : 'Product Details',
  meta: [
    {
      name: 'description',
      content: product.value?.description || 'View product details'
    }
  ]
}));
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.back-link:hover {
  color: #5568d3;
}

.loading, .error {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.product-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 2rem;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-category {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #ede9fe;
  color: #7c3aed;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  width: fit-content;
}

.product-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars {
  color: #fbbf24;
  font-size: 1.5rem;
}

.star {
  color: #d1d5db;
}

.star.filled {
  color: #fbbf24;
}

.rating-value {
  font-weight: 600;
  color: #6b7280;
}

.product-description {
  font-size: 1.125rem;
  line-height: 1.75;
  color: #6b7280;
}

.product-features {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 12px;
}

.product-features h3 {
  margin-top: 0;
  color: #1f2937;
  font-size: 1.125rem;
}

.product-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-features li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.product-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

.stock-info {
  padding: 0.5rem 1rem;
  background: #d1fae5;
  color: #065f46;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  width: fit-content;
}

.stock-info.low-stock {
  background: #fef3c7;
  color: #92400e;
}

.product-price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
}

.product-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.qty-btn {
  padding: 0.75rem 1.25rem;
  background: white;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 600;
  color: #667eea;
  transition: all 0.3s;
}

.qty-btn:hover {
  background: #f3f4f6;
}

.qty-input {
  width: 60px;
  text-align: center;
  border: none;
  border-left: 1px solid #e5e7eb;
  border-right: 1px solid #e5e7eb;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 0;
}

.btn-add-to-cart {
  flex: 1;
  padding: 1rem 2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-add-to-cart:hover:not(:disabled) {
  background: #5568d3;
}

.btn-add-to-cart:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.success-message {
  padding: 1rem;
  background: #d1fae5;
  color: #065f46;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .product-details {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .product-name {
    font-size: 2rem;
  }

  .product-actions {
    flex-direction: column;
  }

  .btn-add-to-cart {
    width: 100%;
  }
}
</style>
