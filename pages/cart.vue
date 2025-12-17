<template>
  <div class="container">
    <h1 class="page-title">Shopping Cart</h1>

    <!-- Empty Cart State -->
    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <div class="empty-icon">🛒</div>
      <h2>Your cart is empty</h2>
      <p>Add some products to get started!</p>
      <NuxtLink to="/" class="btn-primary">Browse Products</NuxtLink>
    </div>

    <!-- Cart with Items -->
    <div v-else class="cart-content">
      
      <!-- List of Cart Items -->
      <div class="cart-items">
        <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
          
          <!-- Product Image -->
          <NuxtImg 
            :src="item.image" 
            :alt="item.name"
            class="item-image"
            format="webp"
            width="120"
            height="120"
          />

          <!-- Product Details -->
          <div class="item-details">
            <NuxtLink :to="`/products/${item.id}`" class="item-name">
              {{ item.name }}
            </NuxtLink>
            <p class="item-category">{{ item.category }}</p>
            <p class="item-price">Rs {{ item.price.toFixed(2) }}</p>
          </div>

          <!-- Quantity Controls -->
          <div class="item-actions">
            <div class="quantity-selector">
              <button @click="decreaseQuantity(item)" class="qty-btn">-</button>
              <span class="qty-display">{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)" class="qty-btn">+</button>
            </div>

            <button @click="removeItem(item.id)" class="btn-remove">Remove</button>
          </div>

          <!-- Item Total Price -->
          <div class="item-total">
            Rs{{ (item.price * item.quantity).toFixed(2) }}
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="cart-summary">
        <h2>Order Summary</h2>
        
        <div class="summary-row">
          <span>Subtotal ({{ cartStore.itemCount }} items)</span>
          <span>Rs {{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>

        <div class="summary-row">
          <span>Shipping</span>
          <span>Rs {{ shippingCost.toFixed(2) }}</span>
        </div>

        <div class="summary-row">
          <span>Tax (10%)</span>
          <span>Rs {{ taxAmount.toFixed(2) }}</span>
        </div>

        <div class="summary-divider"></div>

        <div class="summary-row total">
          <span>Total</span>
          <span>Rs {{ totalAmount.toFixed(2) }}</span>
        </div>

        <button @click="checkout" class="btn-checkout">
          Proceed to Checkout
        </button>

        <button @click="clearAllItems" class="btn-clear">
          Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '~/stores/cart';

// Get access to cart store
const cartStore = useCartStore();

// Calculate shipping cost (free if over $100)
const shippingCost = computed(() => {
  return cartStore.totalPrice > 100 ? 0 : 10;
});

// Calculate tax (10%)
const taxAmount = computed(() => {
  return cartStore.totalPrice * 0.1;
});

// Calculate total amount
const totalAmount = computed(() => {
  return cartStore.totalPrice + shippingCost.value + taxAmount.value;
});

// Increase item quantity
const increaseQuantity = (item: CartItem) => {
  cartStore.updateQuantity(item.id, item.quantity + 1);
};

// Decrease item quantity
const decreaseQuantity = (item: CartItem) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.id, item.quantity - 1);
  }
};

// Remove item from cart
const removeItem = (itemId: number) => {
  cartStore.removeFromCart(itemId);
};

// Clear all items
const clearAllItems = () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    cartStore.clearCart();
  }
};

// Checkout function (just shows alert for now)
const checkout = () => {
  alert('Checkout functionality would be implemented here!');
};

// Set SEO meta tags
useHead({
  title: 'Shopping Cart - Product Catalog',
  meta: [
    {
      name: 'description',
      content: 'View and manage your shopping cart items'
    }
  ]
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1f2937;
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.empty-cart h2 {
  font-size: 1.875rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.empty-cart p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.btn-primary {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #667eea;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #5568d3;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr auto auto;
  gap: 1.5rem;
  padding: 1.5rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  align-items: center;
}

.item-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  text-decoration: none;
}

.item-name:hover {
  color: #667eea;
}

.item-category {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.item-price {
  font-size: 1rem;
  font-weight: 600;
  color: #667eea;
  margin: 0;
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.25rem;
}

.qty-btn {
  width: 32px;
  height: 32px;
  background: white;
  border: none;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 600;
  color: #667eea;
  border-radius: 4px;
}

.qty-btn:hover {
  background: #f3f4f6;
}

.qty-display {
  min-width: 32px;
  text-align: center;
  font-weight: 600;
}

.btn-remove {
  padding: 0.5rem 1rem;
  background: white;
  color: #ef4444;
  border: 2px solid #ef4444;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-remove:hover {
  background: #ef4444;
  color: white;
}

.item-total {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  min-width: 100px;
  text-align: right;
}

.cart-summary {
  padding: 2rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  height: fit-content;
}

.cart-summary h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  color: #6b7280;
}

.summary-row.total {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.summary-divider {
  height: 2px;
  background: #e5e7eb;
  margin: 1rem 0;
}

.btn-checkout {
  width: 100%;
  padding: 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.5rem;
}

.btn-checkout:hover {
  background: #5568d3;
}

.btn-clear {
  width: 100%;
  padding: 0.75rem;
  background: white;
  color: #ef4444;
  border: 2px solid #ef4444;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.75rem;
}

.btn-clear:hover {
  background: #ef4444;
  color: white;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
  }

  .item-image {
    width: 80px;
    height: 80px;
  }

  .item-actions, .item-total {
    grid-column: 1 / -1;
  }
}
</style>
