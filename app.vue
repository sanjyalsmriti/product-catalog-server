<template>
  <div id="app">
    <!-- Header component (navigation) -->
    <Header />
    
    <!-- Main content area - pages will render here -->
    <main class="main-content">
      <NuxtPage />
    </main>
    
    <!-- Footer component -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
// Get access to cart store
const cartStore = useCartStore();

// Load cart from localStorage when app starts
// This only runs in the browser (client-side)
onMounted(() => {
  cartStore.loadCart();
});
</script>

<style>
/* Global styles - apply to entire app */

/* Reset default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #f9fafb;
  color: #1f2937;
  line-height: 1.6;
}

.main-content {
  min-height: calc(100vh - 180px);
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
}

/* Remove number input arrows */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
