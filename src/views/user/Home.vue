<template>
  <div>
    <!-- Banner Section -->
    <div class="banner-container">
      <img src="../../assets/images/banner1.jpg" alt="Banner 1" class="banner-image" />
      <img src="../../assets/images/banner2.jpg" alt="Banner 2" class="banner-image" />
      <img src="../../assets/images/banner3.jpg" alt="Banner 3" class="banner-image" />
    </div>

    <h1>PETSHOP</h1>
    <h2>Khám phá các sản phẩm thú cưng tuyệt vời.</h2>

    <!-- Featured Products Section -->
    <section>
      <h2>Sản phẩm nổi bật</h2>
      <div class="product-list">
        <div v-for="product in homePageData.featuredProducts" :key="product.id" class="product-card">
          <!-- Sử dụng ảnh từ API -->
          <img
              v-if="product.image"
              :src="`http://127.0.0.1:8000/${product.image}`"
              alt="Product Image"
              width="200px"
          />
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p>Giá: {{ product.selling_price }} VND</p>
          <button @click="addToCart(product)">Thêm vào giỏ</button>
        </div>
      </div>
    </section>

    <!-- Popular Products Section -->
    <section>
      <h2>Sản phẩm phổ biến</h2>
      <div class="product-list">
        <div v-for="product in homePageData.popularProducts" :key="product.id" class="product-card">
          <!-- Sử dụng ảnh từ API -->
          <img
              v-if="product.image"
              :src="`http://127.0.0.1:8000/${product.image}`"
              alt="Product Image"
              width="200px"
          />
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p>Giá: {{ product.selling_price }} VND</p>
          <button @click="addToCart(product)">Thêm vào giỏ</button>
        </div>
      </div>
    </section>

    <!-- Product Categories Section -->
    <section>
      <h2>Danh mục sản phẩm</h2>
      <div class="category-list">
        <div v-for="category in homePageData.categories" :key="category.id" class="category-card">
          <!-- Sử dụng ảnh danh mục từ API -->
          <img
              v-if="category.image"
              :src="`http://127.0.0.1:8000/${category.image}`"
              alt="Category Image"
              width="200px"
          />
          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p>
          <button @click="viewCategoryProducts(category)">Xem sản phẩm trong danh mục</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Adjust the import path if needed
import apiConfig from '@/apiConfig'; // Ensure this path points correctly to apiConfig.js

export default {
  name: 'HomePage',  // Ensure the name is multi-word to avoid ESLint error
  data() {
    return {
      homePageData: null,
    };
  },
  mounted() {
    this.fetchHomePageData();
  },
  methods: {
    // Fetch homepage data from the API
    async fetchHomePageData() {
      try {
        const response = await apiConfig.getHomePageData();
        this.homePageData = response.data;
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      }
    },

    // Add product to cart
    addToCart(product) {
      console.log('Adding to cart:', product);
      // Add logic to handle cart addition here
    },

    // View products by category
    viewCategoryProducts(category) {
      console.log(`View products in ${category.name} category`);
      // Add logic to navigate or display category products
    }
  }
};
</script>

<style scoped>
/* Tổng thể layout */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
}

body {
  background-color: #f8f8f8;
  color: #333;
  line-height: 1.6;
}

h1, h2, h3 {
  color: #333;
  margin-bottom: 10px;
}

h1 {
  font-size: 2rem;
  text-align: center;
  margin-top: 20px;
}

p {
  color: #555;
  font-size: 1rem;
  margin-bottom: 15px;
}

/* Banner */
.banner-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
}

.banner-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

/* Các phần tử hiển thị sản phẩm và danh mục */
.product-list, .category-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.product-card, .category-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover, .category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-card img, .category-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 2px solid #ddd;
}

.product-card h3, .category-card h3 {
  font-size: 1.2rem;
  margin: 10px 0;
}

.product-card p, .category-card p {
  font-size: 0.9rem;
  color: #777;
}

button {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

/* Responsive design cho màn hình nhỏ */
@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }

  .banner-container {
    flex-direction: column;
    align-items: center;
  }

  .product-list, .category-list {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .product-card, .category-card {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.2rem;
  }

  .product-card, .category-card {
    width: 100%;
  }

  button {
    font-size: 0.9rem;
    padding: 8px;
  }
}
</style>
