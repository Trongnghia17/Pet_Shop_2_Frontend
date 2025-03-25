<template>
  <div class="home-container">
    <!-- Banner Section -->
    <div class="banner-section">
      <div class="banner-content">
        <h1>Khám phá các sản phẩm quà tuyệt vời</h1>
        <p>Tìm những món quà độc đáo và ý nghĩa cho người thân yêu</p>
        <button class="shop-now-btn" @click="$router.push({ path: '/accessory' })">Mua sắm ngay</button>
      </div>
    </div>

    <!-- Featured Products Section -->
    <section v-if="homePageData" class="products-section">
      <div class="section-header">
        <h2>Sản phẩm nổi bật</h2>
        <div class="section-divider"></div>
      </div>
      <div class="product-list">
        <div v-for="product in homePageData.featuredProducts" :key="product.id"
             class="product-card" @click="viewProductDetail(product)">
          <div class="product-image">
            <img v-if="product.image" :src="`${baseURL}/${product.image}`" alt="Product Image"/>
            <div class="quick-actions">
              <button class="action-btn" @click.stop="addToCart(product)">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="product-stock">Còn lại: {{ product.quantity }}</div>
            <div class="product-price">
              <span class="original-price">{{ formatPrice(product.original_price.toLocaleString()) }}₫</span>
              <span class="selling-price">{{ formatPrice(product.selling_price.toLocaleString()) }}₫</span>
            </div>
            <button class="add-to-cart" @click.stop="addToCart(product)">Thêm vào giỏ</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Products Section -->
    <section v-if="homePageData" class="products-section">
      <div class="section-header">
        <h2>Sản phẩm phổ biến</h2>
        <div class="section-divider"></div>
      </div>
      <div class="product-list">
        <div v-for="product in homePageData.popularProducts" :key="product.id"
             class="product-card" @click="viewProductDetail(product)">
          <div class="product-image">
            <img v-if="product.image" :src="`${baseURL}/${product.image}`" alt="Product Image"/>
            <div class="quick-actions">
              <button class="action-btn" @click.stop="addToCart(product)">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="product-stock">Còn lại: {{ product.quantity }}</div>
            <div class="product-price">
              <span class="original-price">{{ formatPrice(product.original_price.toLocaleString()) }}₫</span>
              <span class="selling-price">{{ formatPrice(product.selling_price.toLocaleString()) }}₫</span>
            </div>
            <button class="add-to-cart" @click.stop="addToCart(product)">Thêm vào giỏ</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axiosInstance from "../../axiosInstance";
import apiConfigCart from "../../store/cart";
import apiConfigHome from "../../store/home";
import Cookies from "js-cookie";
import { formatPrice } from '@/utils/formatters';

export default {
  name: "HomePage",
  data() {
    return {
      homePageData: null,
      baseURL: axiosInstance.defaults.baseURL,
      selectedCategoryProducts: [],
    };
  },
  mounted() {
    this.fetchHomePageData();
    this.loadFontAwesome();
  },
  methods: {
    formatPrice,
    loadFontAwesome() {
      const script = document.createElement('script');
      script.src = 'https://kit.fontawesome.com/a076d05399.js';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    },
    async fetchHomePageData() {
      try {
        const response = await apiConfigHome.getHomePageData();
        this.homePageData = response.data;
        if (this.homePageData.categories && this.homePageData.categories.length > 0) {
          this.selectedCategoryProducts = this.homePageData.categories[0].products;
        }
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    },
    async addToCart(product) {
      const isLoggedIn = Cookies.get("token");
      if (!isLoggedIn) {
        this.$toast.error('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng');
        this.$router.push({path: '/login'});
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
          this.$router.push({path: '/shopping-cart'});
        } else {
          console.error("Failed to add product to cart:", response.data);
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    },
    viewCategoryProducts(category) {
      this.selectedCategoryProducts = category.products;
    },
    viewProductDetail(product) {
      const categorySlug = product.category.slug;
      const productSlug = product.slug;
      this.$router.push({path: `/product-detail/${categorySlug}/${productSlug}`});
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

.home-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  font-family: 'Roboto', sans-serif;
}

/* Banner Section */
.banner-section {
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  margin: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 0 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.banner-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.banner-content p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.shop-now-btn {
  background-color: white;
  color: #764ba2;
  font-weight: 600;
  padding: 12px 30px;
  border-radius: 30px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.shop-now-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Section Headers */
.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.section-divider {
  height: 3px;
  width: 80px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  margin: 0 auto;
  border-radius: 3px;
}

/* Products Section */
.products-section {
  margin: 60px 0;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .product-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .product-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .product-list {
    grid-template-columns: 1fr;
  }
}

.product-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.product-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.quick-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0;
  transition: all 0.3s ease;
}

.product-card:hover .quick-actions {
  opacity: 1;
}

.action-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  border: none;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background-color: #764ba2;
  color: white;
  transform: translateY(-2px);
}

.product-info {
  padding: 20px;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 10px;
  color: #333;
  height: 50px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-stock {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 10px;
}

.product-price {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 0.9rem;
  margin-right: 10px;
}

.selling-price {
  font-size: 1.2rem;
  font-weight: 600;
  color: #e74c3c;
}

.add-to-cart {
  width: 100%;
  padding: 12px 0;
  background-color: #764ba2;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart:hover {
  background-color: #667eea;
}

/* Responsive Design */
@media (max-width: 768px) {
  .banner-section {
    height: 350px;
  }

  .banner-content h1 {
    font-size: 2rem;
  }

  .banner-content p {
    font-size: 1rem;
  }

  .section-header h2 {
    font-size: 1.8rem;
  }

  .product-list {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .banner-section {
    height: 300px;
    margin: 20px 0;
  }

  .banner-content h1 {
    font-size: 1.7rem;
  }

  .product-list {
    grid-template-columns: 1fr;
  }

  .products-section {
    margin: 40px 0;
  }
}
</style>