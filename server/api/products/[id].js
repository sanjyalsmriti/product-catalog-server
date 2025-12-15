const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 45,
    rating: 4.5,
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0',
      'Comfortable over-ear design'
    ]
  },
  {
    id: 2,
    name: 'Ergonomic Office Chair',
    description: 'Comfortable office chair with lumbar support and adjustable height.',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&h=500&fit=crop',
    category: 'Furniture',
    stock: 23,
    rating: 4.8,
    features: [
      'Adjustable lumbar support',
      'Height adjustable',
      'Breathable mesh back',
      '360-degree swivel'
    ]
  },
  {
    id: 3,
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle that keeps drinks cold for 24 hours.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
    category: 'Accessories',
    stock: 120,
    rating: 4.6,
    features: [
      'Double-wall insulation',
      '24-hour cold retention',
      'BPA-free',
      'Leak-proof lid'
    ]
  },
  {
    id: 4,
    name: 'Smart Watch Series X',
    description: 'Advanced smartwatch with fitness tracking and heart rate monitoring.',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 67,
    rating: 4.7,
    features: [
      'Heart rate monitoring',
      'Sleep tracking',
      'Water resistant',
      'GPS enabled'
    ]
  },
  {
    id: 5,
    name: 'Leather Laptop Bag',
    description: 'Premium leather bag with padded compartment for laptops up to 15 inches.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    category: 'Accessories',
    stock: 34,
    rating: 4.4,
    features: [
      'Genuine leather',
      'Padded laptop compartment',
      'Multiple pockets',
      'Adjustable strap'
    ]
  },
  {
    id: 6,
    name: 'Mechanical Keyboard RGB',
    description: 'Gaming mechanical keyboard with customizable RGB lighting.',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 56,
    rating: 4.9,
    features: [
      'Mechanical switches',
      'RGB backlighting',
      'Programmable keys',
      'Anti-ghosting'
    ]
  },
  {
    id: 7,
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with extra cushioning for comfortable practice.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
    category: 'Sports',
    stock: 89,
    rating: 4.3,
    features: [
      'Non-slip surface',
      'Extra thick padding',
      'Eco-friendly material',
      'Includes carrying strap'
    ]
  },
  {
    id: 8,
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with thermal carafe and brew strength control.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
    category: 'Appliances',
    stock: 41,
    rating: 4.5,
    features: [
      'Programmable timer',
      'Thermal carafe',
      'Brew strength control',
      'Auto shut-off'
    ]
  },
  {
    id: 9,
    name: 'Wireless Gaming Mouse',
    description: 'High-precision wireless mouse with customizable DPI settings.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 78,
    rating: 4.6,
    features: [
      'Wireless connectivity',
      'Adjustable DPI',
      'Ergonomic design',
      'Long battery life'
    ]
  },
  {
    id: 10,
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof bluetooth speaker with 360-degree sound and 12-hour battery.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 93,
    rating: 4.7,
    features: [
      'Waterproof IPX7',
      '360-degree sound',
      '12-hour battery',
      'Bluetooth 5.0'
    ]
  },
  {
    id: 11,
    name: 'Standing Desk Converter',
    description: 'Adjustable standing desk converter for ergonomic workspace.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=500&h=500&fit=crop',
    category: 'Furniture',
    stock: 28,
    rating: 4.4,
    features: [
      'Height adjustable',
      'Wide work surface',
      'Easy assembly',
      'Sturdy construction'
    ]
  },
  {
    id: 12,
    name: 'LED Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
    category: 'Lighting',
    stock: 64,
    rating: 4.5,
    features: [
      'Adjustable brightness',
      'Color temperature control',
      'USB charging port',
      'Modern design'
    ]
  }
];

export default defineEventHandler((event) => {
  const id = parseInt(event.context.params?.id || '0');
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find(p => p.id === id);
      
      if (!product) {
        reject(createError({
          statusCode: 404,
          statusMessage: 'Product not found'
        }));
      } else {
        resolve(product);
      }
    }, 200);
  });
});
