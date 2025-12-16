<template>
  <div class="container">
    <!-- Hero Section -->
    <div class="hero-section">
      <h1 class="hero-title">Product Catalog</h1>
      <p class="hero-subtitle">Discover amazing products at great prices</p>
    </div>

    <!-- Category Filter -->
    <div class="filters">
      <label for="category-filter" class="filter-label">Filter by Category:</label>
      <select id="category-filter" v-model="selectedCategory" @change="handleCategoryChange" class="category-select">
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
        <option value="Accessories">Accessories</option>
        <option value="Sports">Sports</option>
        <option value="Appliances">Appliances</option>
        <option value="Lighting">Lighting</option>
      </select>
    </div>

    <!-- Loading State - Shows spinner while fetching data -->
    <div v-if="pending" class="loading">
      <div class="spinner"></div>
      <p>Loading products...</p>
    </div>

    <!-- Error State - Shows if something went wrong -->
    <div v-else-if="error" class="error">
      <p>Error loading products: {{ error.message }}</p>
    </div>

    <!-- Products Grid - Shows when data is loaded -->
    <div v-else>
      <div class="products-grid">
        <!-- Loop through each product and display a card -->
        <ProductCard 
          v-for="product in data?.products" 
          :key="product.id" 
          :product="product" 
        />
      </div>

      <!-- Pagination Controls -->
      <div v-if="data?.pagination" class="pagination">
        <button 
          @click="goToPage(currentPage - 1)" 
          :disabled="currentPage === 1"
          class="pagination-btn"
        >
          Previous
        </button>
        
        <div class="pagination-info">
          Page {{ data.pagination.page }} of {{ data.pagination.totalPages }}
        </div>
        
        <button 
          @click="goToPage(currentPage + 1)" 
          :disabled="currentPage >= data.pagination.totalPages"
          class="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import types for TypeScript
import type { ProductsResponse } from '~/types';

// Get access to route and router (for navigation)
const route = useRoute();
const router = useRouter();

// Create reactive variables - these update the UI when they change
const currentPage = ref(parseInt(route.query.page as string) || 1);
const selectedCategory = ref(route.query.category as string || '');

// Fetch products from the server API
// This runs on the server first (SSR), then works on client side
const { data, pending, error } = await useAsyncData<ProductsResponse>(
  'products', // unique key for this data
  () => $fetch<ProductsResponse>('/api/products', {
    query: {
      page: currentPage.value,
      limit: 6, // show 6 products per page
      category: selectedCategory.value || undefined
    }
  }),
  {
    // Watch these variables - refetch when they change
    watch: [currentPage, selectedCategory]
  }
);

// Function to change pages
const goToPage = (page: number) => {
  currentPage.value = page;
  
  // Update the URL with new page number
  router.push({
    query: {
      page,
      category: selectedCategory.value || undefined
    }
  });
  
  // Scroll to top of page smoothly
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Function to handle category changes
const handleCategoryChange = () => {
  currentPage.value = 1; // Reset to page 1 when changing category
  router.push({
    query: {
      page: 1,
      category: selectedCategory.value || undefined
    }
  });
};

// Set SEO meta tags for this page
useHead({
  title: 'Product Catalog - Shop Amazing Products',
  meta: [
    {
      name: 'description',
      content: 'Browse our extensive collection of high-quality products including electronics, furniture, accessories, and more. Find the perfect items at great prices.'
    }
  ]
});
</script>

<style scoped>
/* Scoped styles - only apply to this component */

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
}

.filters {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.category-select {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
}

.category-select:hover {
  border-color: #667eea;
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

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 3rem;
}

.pagination-btn {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  background: #5568d3;
  transform: translateY(-2px);
}

.pagination-btn:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  transform: none;
}

.pagination-info {
  font-weight: 600;
  color: #4b5563;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
