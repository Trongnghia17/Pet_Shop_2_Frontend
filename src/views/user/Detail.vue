<template>
  <div class="product-detail-container">
    <div v-if="product" class="product-detail-content">
      <div class="product-image">
        <img :src="`http://127.0.0.1:8000/${product.image}`" alt="Product Image" class="product-main-image" />
      </div>
      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>
        <p class="product-price">Giá: {{ formattedPrice }} VNĐ</p>
        <p class="product-description">
          {{ product.description || "Sản phẩm chất lượng cao, phù hợp cho mọi gia đình." }}
        </p>
        <div class="product-options">
          <div class="option">
            <label for="quantity">Số lượng:</label>
            <input
                type="number"
                id="quantity"
                v-model="quantity"
                min="1"
                :max="product.stock"
                class="quantity-input"
            />
          </div>
        </div>
        <div class="product-buttons">
          <button class="add-to-cart-button" @click="addToCart">Thêm vào giỏ hàng</button>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Đang tải thông tin sản phẩm...</p>
    </div>
  </div>
</template>

<script>
import apiConfig from "@/apiConfig"; // Đảm bảo đường dẫn đúng

export default {
  name: "ProductDetailPage",
  data() {
    return {
      product: null,
      quantity: 1,
    };
  },
  computed: {
    formattedPrice() {
      return (this.product?.selling_price || 0).toLocaleString();
    },
  },
  mounted() {
    this.fetchProductDetail();
  },
  methods: {
    async fetchProductDetail() {
      try {
        const response = await apiConfig.getHomePageData();
        const allProducts = [...response.data.featuredProducts, ...response.data.popularProducts];
        const productId = Number(this.$route.params.id);
        this.product = allProducts.find((p) => p.id === productId);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    },
    addToCart() {
      if (!this.product) return;
      alert(`Đã thêm sản phẩm ${this.product.name} vào giỏ hàng với số lượng: ${this.quantity}`);
    },
  },
};
</script>

<style scoped>
/* Cấu hình lại kiểu dáng của thanh số lượng */
.quantity-input {
  width: 70px;
  padding: 10px;
  font-size: 1.2rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  text-align: center;
  transition: border-color 0.3s ease;
}

.quantity-input:focus {
  outline: none;
  border-color: #ff6f61;
}

/* Cấu hình container sản phẩm */
.product-detail-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px;
  background: linear-gradient(to bottom, #f4f4f9, #e9e9f5);
  min-height: 100vh;
}

.product-detail-content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  padding: 25px;
  border-radius: 20px;
  transition: transform 0.3s ease;
}

.product-detail-content:hover {
  transform: translateY(-5px);
}

.product-image {
  flex: 1;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background: linear-gradient(135deg, #f9f9f9, #e0e0e0);
  padding: 15px;
}

.product-main-image {
  width: 100%;
  border-radius: 15px;
  object-fit: cover;
  max-height: 500px;
}

.product-info {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #333;
}

.product-title {
  font-size: 2.8rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
  letter-spacing: 0.5px;
}

.product-price {
  font-size: 1.8rem;
  color: #ff6f61;
  font-weight: bold;
  margin-bottom: 25px;
  background: #fff5f5;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(255, 111, 97, 0.2);
}

.product-description {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 25px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.product-options {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
}

.product-select {
  padding: 10px;
  font-size: 1.1rem;
  border-radius: 10px;
  border: 1px solid #ddd;
  width: 180px;
  background: #f9f9f9;
  transition: background-color 0.3s ease;
}

.product-select:hover {
  background-color: #ff6f61;
  color: #fff;
}

.product-buttons button {
  padding: 15px 25px;
  border-radius: 10px;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.product-buttons button:hover {
  transform: translateY(-3px);
}

.add-to-cart-button {
  background-color: #ff6f61;
  color: white;
  border: none;
}

.add-to-cart-button:hover {
  background-color: #ff4b3a;
}

.add-to-wishlist-button {
  background-color: #ddd;
  color: #333;
  border: none;
}

.add-to-wishlist-button:hover {
  background-color: #bbb;
}

/* Phần đánh giá */
.product-reviews {
  margin-top: 50px;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.reviews-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 2px solid #ff6f61;
  padding-bottom: 10px;
}

.reviews-list {
  margin-bottom: 30px;
}

.review-item {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.review-user {
  font-weight: bold;
  font-size: 1.1rem;
}

.review-date {
  font-size: 0.9rem;
  color: #777;
  margin-left: 10px;
}

.review-rating {
  margin-top: 5px;
}

.star {
  color: #ff6f61;
  font-size: 1.4rem;
  margin-right: 3px;
}

.filled {
  color: gold;
}

.review-comment {
  margin-top: 10px;
  font-size: 1.1rem;
  color: #333;
}

.review-form {
  padding: 25px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.review-textarea {
  width: 100%;
  padding: 15px;
  font-size: 1.1rem;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
  min-height: 120px;
  resize: vertical;
}

.submit-review-button {
  background-color: #ff6f61;
  color: white;
  border: none;
  padding: 15px 25px;
  font-size: 1.4rem;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.submit-review-button:hover {
  background-color: #ff4b3a;
  transform: translateY(-3px);
}
</style>
