<template>
  <header class="header">
    <div class="header-container">
      
      <!-- Logo - links to homepage -->
      <NuxtLink to="/" class="logo">
        <span class="logo-icon">🛍️</span>
        <span class="logo-text">ProductCatalog</span>
      </NuxtLink>

      <!-- Navigation Links -->
      <nav class="nav">
        <NuxtLink to="/" class="nav-link">
          Products
        </NuxtLink>
        
        <!-- Cart Link with Badge showing item count -->
        <NuxtLink to="/cart" class="nav-link cart-link">
          <span class="cart-icon">🛒</span>
          Cart
          <!-- Only show badge if there are items in cart -->
          <span v-if="cartStore.itemCount > 0" class="cart-badge">
            {{ cartStore.itemCount }}
          </span>
        </NuxtLink>
      </nav>
      
    </div>
  </header>
</template>

<script setup lang="ts">
// Get access to cart store to show item count
const cartStore = useCartStore();
</script>

<style scoped>
.header {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.25rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  text-decoration: none;
}

.logo:hover {
  color: #667eea;
}

.logo-icon {
  font-size: 2rem;
}

.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  font-weight: 600;
  color: #6b7280;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  position: relative;
  transition: all 0.3s;
}

.nav-link:hover {
  color: #667eea;
  background: #f3f4f6;
}

.cart-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-icon {
  font-size: 1.25rem;
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  min-width: 20px;
  text-align: center;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
  }

  .logo-text {
    display: none;
  }

  .nav {
    gap: 1rem;
  }
}
</style>
