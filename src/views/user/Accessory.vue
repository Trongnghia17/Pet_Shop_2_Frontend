<template>
  <div class="accessory">
    <!-- Hero Section -->
    <div class="hero-section">
      <h1>Phụ kiện & Quà tặng</h1>
      <p>Khám phá bộ sưu tập những món quà độc đáo và ý nghĩa</p>

      <div class="search-container">
        <v-text-field
            hide-details
            outlined
            dense
            v-model="name"
            label="Tìm kiếm sản phẩm..."
            prepend-inner-icon="mdi-magnify"
            @keydown.enter="search"
            @keyup="searchEmpty"
            class="search-field"
        ></v-text-field>
      </div>
    </div>

    <div class="main-container">
      <div class="sidebar">
        <div class="category-header">
          <h3>DANH MỤC SẢN PHẨM</h3>
        </div>
        <ul class="category-list">
          <li v-for="category in homePageData.categories" :key="category.id">
            <button @click="viewCategoryProducts(category)">
              <span class="category-name">{{ category.name }}</span>
              <span class="category-count">{{category.products.length}}</span>
            </button>
          </li>
        </ul>
      </div>

      <div class="products-container">
        <div class="product-grid">
          <div
              class="product-card"
              v-for="product in pagedProducts"
              :key="product.id"
          >
            <div class="product-image" @click="viewProductDetail(product)">
              <img
                  :src="`${baseURL}/${product.image}`"
                  alt="Product Image"
              />
              <div class="product-overlay">
                <span>Xem chi tiết</span>
              </div>
            </div>
            <div class="product-details">
              <h3 @click="viewProductDetail(product)">{{ product.name }}</h3>
              <div class="product-meta">Số lượng: {{ product.quantity }}</div>
              <div class="price-container">
                <div class="original-price">{{ formatPrice(product.original_price) }} VND</div>
                <div class="selling-price">{{ formatPrice(product.selling_price) }} VND</div>
              </div>
              <button class="add-to-cart-btn" @click="addToCart(product)">
                <i class="fas fa-shopping-cart"></i>
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="pagination" v-if="totalPages > 1">
          <button
              class="pagination-btn"
              @click="prevPage"
              :disabled="currentPage === 1"
          >
            <i class="fas fa-chevron-left"></i>
          </button>

          <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              class="pagination-btn"
              :class="{ active: currentPage === page }"
          >
            {{ page }}
          </button>

          <button
              class="pagination-btn"
              @click="nextPage"
              :disabled="currentPage === totalPages"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "../../axiosInstance";
import apiConfigCart from "../../store/cart";
import apiConfigHome from "../../store/home";
import {isNullOrEmpty} from "@/utils/validators";
import Cookies from "js-cookie";
import { formatPrice } from '@/utils/formatters';

export default {
  name: "AccessoryComponent",
  data() {
    return {
      homePageData: null,
      baseURL: axiosInstance.defaults.baseURL,
      selectedCategoryProducts: [],
      name: "",
      currentPage: 1,
      itemsPerPage: 9,
    };
  },
  computed: {
    pagedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.selectedCategoryProducts.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.selectedCategoryProducts.length / this.itemsPerPage);
    }
  },
  mounted() {
    this.fetchHomePageData();
  },
  methods: {
    formatPrice,
    search() {
      this.fetchHomePageData();
    },
    searchEmpty() {
      setTimeout(() => {
        if (isNullOrEmpty(this.name)) {
          this.search();
        }
      }, 10);
    },
    async fetchHomePageData() {
      try {
        const payload = {
          name: this.name,
        };
        const data = {
          params: {
            ...payload,
          },
        };
        const response = await apiConfigHome.getHomePageData(data);

        this.homePageData = response.data;
        this.selectedCategoryProducts = this.homePageData.products;
        this.currentPage = 1; // Reset to first page when new data is loaded
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    },
    async addToCart(product) {
      const isLoggedIn = Cookies.get("token");
      if (!isLoggedIn) {
        this.$toast.error('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng');
        this.$router.push({ path: '/login' });
        return;
      }
      let data = {
        product_id: product.id,
        product_quantity: 1,
      };
      try {
        const response = await apiConfigCart.addCart(data);
        if (response.status === 200) {
          this.$toast.success('Thêm vào giỏ hàng thành công');
          this.$router.push({ path: '/shopping-cart' });
        } else {
          console.error("Failed to add product to cart:", response.data);
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    },
    viewCategoryProducts(category) {
      this.selectedCategoryProducts = category.products;
      this.currentPage = 1; // Reset to first page when changing categories
    },
    viewProductDetail(product) {
      const categorySlug = product.category.slug;
      const productSlug = product.slug;
      this.$router.push({ path: `/product-detail/${categorySlug}/${productSlug}` });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        window.scrollTo(0, 0);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        window.scrollTo(0, 0);
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        window.scrollTo(0, 0);
      }
    },
  },
}
</script>
<style scoped>
.accessory {
  margin: 0 auto;
  width: 1250px;
  font-family: 'Roboto', 'Arial', sans-serif;
  color: #2c3e50;
  padding: 0 15px;
}

/* Hero Section */
.hero-section {
  text-align: center;
  padding: 40px 20px 30px;
  background: linear-gradient(to right, #f8f9fa, #f3e8fa);
  border-radius: 15px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.hero-section h1 {
  font-size: 2.5rem;
  color: #34495e;
  margin-bottom: 10px;
  font-weight: 700;
}

.hero-section p {
  font-size: 1.1rem;
  color: #7f8c8d;
  margin-bottom: 25px;
}

.search-container {
  max-width: 600px;
  margin: 0 auto;
}

.search-field {
  border-radius: 50px !important;
}

:deep(.v-text-field.v-text-field--enclosed) {
  border-radius: 50px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.08);
}

:deep(.v-text-field .v-input__slot) {
  background-color: white !important;
  border-radius: 50px !important;
  padding: 0 10px !important;
}

:deep(.v-text-field .v-icon) {
  color: #764ba2 !important;
}

/* Main Container */
.main-container {
  display: flex;
  gap: 30px;
  margin-top: 20px;
}

/* Sidebar */
.sidebar {
  width: 280px;
  flex-shrink: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  position: sticky;
  top: 20px;
  height: fit-content;
}

.category-header {
  padding: 20px;
  background: linear-gradient(to right, #764ba2, #8a65b7);
}

.sidebar h3 {
  color: white;
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.category-list {
  list-style: none;
  padding: 10px 0;
  margin: 0;
}

.category-list li {
  margin: 0;
}

.category-list button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 14px 20px;
  border: none;
  background: transparent;
  color: #34495e;
  font-size: 15px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f1f1f1;
}

.category-list button:hover {
  background-color: #f8f9fa;
  color: #764ba2;
}

.category-name {
  flex-grow: 1;
}

.category-count {
  background-color: #f1f1f1;
  color: #7f8c8d;
  border-radius: 20px;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 500;
}

/* Products Container */
.products-container {
  flex-grow: 1;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

/* Product Card */
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.product-image {
  position: relative;
  padding-top: 100%;
  overflow: hidden;
}

.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.08);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(52, 73, 94, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.product-overlay span {
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 4px;
  background: rgba(118, 75, 162, 0.9);
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.product-details {
  padding: 20px;
}

.product-card h3 {
  font-size: 16px;
  color: #34495e;
  margin: 0 0 10px;
  font-weight: 600;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  cursor: pointer;
}

.product-card h3:hover {
  color: #764ba2;
}

.product-meta {
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 10px;
}

.price-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.original-price {
  font-size: 14px;
  color: #7f8c8d;
  text-decoration: line-through;
  margin-right: 10px;
}

.selling-price {
  font-size: 18px;
  font-weight: 700;
  color: #764ba2;
}

.add-to-cart-btn {
  width: 100%;
  padding: 12px;
  background-color: #764ba2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.add-to-cart-btn:hover {
  background-color: #8a65b7;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(118, 75, 162, 0.3);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 8px;
}

.pagination-btn {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #34495e;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
}

.pagination-btn:hover {
  background-color: #f8f9fa;
  color: #764ba2;
  border-color: #764ba2;
}

.pagination-btn.active {
  background-color: #764ba2;
  color: white;
  border-color: #764ba2;
}

.pagination-btn:disabled {
  background-color: #f1f1f1;
  color: #bdc3c7;
  cursor: not-allowed;
  border-color: #e0e0e0;
}

/* Responsive */
@media (max-width: 1024px) {
  .main-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: static;
  }
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
  }

  .hero-section {
    padding: 30px 15px 20px;
  }
}
</style>