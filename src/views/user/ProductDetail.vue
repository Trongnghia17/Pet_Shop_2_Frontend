<template>
  <div class="product-detail">
    <div v-if="product" class="product-container">
      <img
          v-if="product.image"
          :src="`${baseURL}/${product.image}`"
          :alt="product.name"
          class="product-image"
      />
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="product-description">{{ product.description }}</p>
        <p><strong>Số lượng:</strong> {{ product.quantity }}</p>
        <div class="quantity-control">
          <button @click="decreaseQuantity">-</button>
          <input
              type="text"
              v-model="quantity"
              @input="updateCartQuantity"
          />
          <button @click="increaseQuantity">+</button>
        </div>
        <p><strong>Giá gốc:</strong> {{ product.original_price }} VND</p>
        <p class="discounted-price">
          <strong>Giảm còn:</strong> {{ product.selling_price }} VND
        </p>
        <button @click="addToCart(product)">Thêm vào giỏ</button>
      </div>
    </div>
    <div v-else class="loading">
      <p>Đang tải thông tin sản phẩm...</p>
    </div>
  </div>
</template>

<script>
import axiosInstance from "../../axiosInstance";
import apiConfigCart from "../../store/cart";
import apiConfigHome from "../../store/home";

export default {
  name: "ProductDetail",
  data() {
    return {
      product: null,
      baseURL: axiosInstance.defaults.baseURL,
      quantity: 1,
    };
  },
  mounted() {
    this.fetchProductDetail();
  },
  methods: {
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    updateCartQuantity() {
      // This method can be used to handle any additional logic when the quantity is updated
    },
    async fetchProductDetail() {
      const category_slug  = this.$route.params.category_slug;
      const product_slug = this.$route.params.product_slug
      try {
        const response = await apiConfigHome.detailProduct(category_slug,product_slug);
        this.product = response.data.product;
        console.log(response.data.product);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    },
    async addToCart(product) {
      const data = {
        product_id: product.id,
        product_quantity: this.quantity,
      };
      try {
        const response = await apiConfigCart.addCart(data);
        if (response.status === 200) {
          this.$toast.success("Thêm vào giỏ hàng thành công");
          this.$router.push({ path: "/shopping-cart" });
        } else {
          console.error("Failed to add product to cart:", response.data);
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    },
  },
};
</script>

<style scoped>
.product-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f2f2f2;
  color: #333;
  font-family: 'Arial', sans-serif;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 1200px;
  width: 100%;
}

.product-image {
  width: 100%;
  max-width: 450px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-image:hover {
  transform: scale(1.05);
}

.product-info {
  max-width: 600px;
  text-align: left;
  padding: 20px;
}

h1 {
  font-size: 2.4rem;
  color: #222;
  margin-bottom: 20px;
  font-weight: bold;
}

.product-description {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 20px;
  line-height: 1.6;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
}

.quantity-control button {
  background-color: #ff6f61;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.quantity-control button:hover {
  background-color: #e65a50;
}

.quantity-control input {
  width: 60px;
  text-align: center;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 6px;
}

.discounted-price {
  color: #ff3b30;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 15px 0;
}

button {
  background-color: #ff6f61;
  color: white;
  padding: 14px 18px;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #e65a50;
  transform: translateY(-2px);
}

button:active {
  background-color: #d95448;
  transform: translateY(0);
}

.loading {
  font-size: 1.5rem;
  color: #666;
  margin: 50px 0;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .product-container {
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .product-info {
    padding: 10px;
    text-align: center;
  }

  h1 {
    font-size: 2rem;
  }

  .discounted-price {
    font-size: 1.3rem;
  }
}

</style>
