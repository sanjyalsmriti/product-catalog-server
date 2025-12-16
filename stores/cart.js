import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isLoaded: false
  }),

  getters: {
    itemCount: (state) => {
      let total = 0;
      for (const item of state.items) {
        total = total + item.quantity;
      }
      return total;
    },
    
    totalPrice: (state) => {
      let total = 0;
      for (const item of state.items) {
        total = total + (item.price * item.quantity);
      }
      return total;
    },
    
    cartItems: (state) => state.items,
    
    getItemById: (state) => (id) => {
      return state.items.find(item => item.id === id);
    }
  },

  actions: {
    loadCart() {
      if (import.meta.client && !this.isLoaded) {
        const saved = localStorage.getItem('cart');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            this.items = Array.isArray(parsed) ? parsed : [];
          } catch (e) {
            console.error('Failed to load cart', e);
            this.items = [];
          }
        }
        this.isLoaded = true;
      }
    },

    saveCart() {
      if (import.meta.client) {
        localStorage.setItem('cart', JSON.stringify(this.items));
      }
    },

    addToCart(product, quantity = 1) {
      const existingItem = this.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity = existingItem.quantity + quantity;
      } else {
        this.items.push({
          ...product,
          quantity: quantity
        });
      }
      
      this.saveCart();
    },

    removeFromCart(productId) {
      const index = this.items.findIndex(item => item.id === productId);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.saveCart();
      }
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId);
        } else {
          item.quantity = quantity;
          this.saveCart();
        }
      }
    },

    clearCart() {
      this.items = [];
      this.saveCart();
    }
  }
});
