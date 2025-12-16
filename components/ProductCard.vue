<template>
  <div class="product-card">
    <!-- Link to product details page -->
    <NuxtLink :to="`/products/${product.id}`" class="product-link">
      
      <!-- Product Image -->
      <div class="image-container">
        <NuxtImg 
          :src="product.image" 
          :alt="product.name"
          class="product-image"
          format="webp"
          quality="75"
          width="400"
          height="400"
          loading="lazy"
          preload
        />
        <div class="category-badge">{{ product.category }}</div>
      </div>

      <!-- Product Content -->
      <div class="product-content">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-description">{{ shortDescription }}</p>
        
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

        <!-- Price and Stock -->
        <div class="product-footer">
          <span class="product-price">${{ product.price.toFixed(2) }}</span>
          <span class="product-stock" :class="{ 'low-stock': product.stock < 30 }">
            {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
          </span>
        </div>
      </div>
    </NuxtLink>

    <!-- Add to Cart Button -->
    <button 
      @click="addToCart" 
      :disabled="product.stock === 0" 
      class="btn-add-cart"
    >
      {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
    </button>
  </div>
</template>

<script setup lang="ts">
// Import types
import type { Product } from '~/types';

// Define what props this component receives
const props = defineProps<{
  product: Product
}>();

// Get access to cart store
const cartStore = useCartStore();

// Create a shorter version of the description
const shortDescription = computed(() => {
  if (props.product.description.length > 100) {
    return props.product.description.substring(0, 100) + '...';
  }
  return props.product.description;
});

// Function to add product to cart
const addToCart = (event: Event) => {
  // Prevent navigation to product page
  event.preventDefault();
  
  // Add to cart
  cartStore.addToCart(props.product);
  
  // Show feedback (you could also show a toast notification)
  console.log('Added to cart:', props.product.name);
};
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.product-link {
  text-decoration: none;
  color: inherit;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: #f3f4f6;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.category-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #667eea;
}

.product-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.product-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
}

.product-description {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
  flex: 1;
  margin: 0;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars {
  font-size: 1rem;
}

.star {
  color: #d1d5db;
}

.star.filled {
  color: #fbbf24;
}

.rating-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
}

.product-stock {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  background: #d1fae5;
  color: #065f46;
  border-radius: 12px;
}

.product-stock.low-stock {
  background: #fef3c7;
  color: #92400e;
}

.btn-add-cart {
  width: 100%;
  padding: 1rem;
  background: #667eea;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-add-cart:hover:not(:disabled) {
  background: #5568d3;
}

.btn-add-cart:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}
</style>
