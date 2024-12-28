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
    <section v-if="homePageData">
      <h2>Sản phẩm nổi bật</h2>
      <div class="product-list">
        <div v-for="product in homePageData.featuredProducts" :key="product.id" class="product-card" @click="viewProductDetail(product)">
          <img
              v-if="product.image"
              :src="`${baseURL}/${product.image}`"
              alt="Product Image"
              width="200px"
          />
          <h3>{{ product.name }}</h3>
          <div> Số lượng {{ product.quantity }}</div>
          <div>Giá gốc: {{ product.original_price }} VND</div>
          <div class="discounted-price">Giảm còn: {{ product.selling_price }} VND</div>
          <button @click.stop="addToCart(product)">Thêm vào giỏ</button>
        </div>
      </div>
    </section>

    <!-- Popular Products Section -->
    <section v-if="homePageData">
      <h2>Sản phẩm phổ biến</h2>
      <div class="product-list">
        <div v-for="product in homePageData.popularProducts" :key="product.id" class="product-card">
          <img
              v-if="product.image"
              :src="`${baseURL}/${product.image}`"
              alt="Product Image"
              width="200px"
          />
          <h3>{{ product.name }}</h3>
          <div> Số lượng {{ product.quantity }}</div>
          <div>Giá gốc: {{ product.original_price }} VND</div>
          <div class="discounted-price">Giảm còn: {{ product.selling_price }} VND</div>
          <button @click="addToCart(product)">Thêm vào giỏ</button>
        </div>
      </div>
    </section>

    <!-- Product Categories Section -->
    <section v-if="homePageData">
      <h2>Danh mục sản phẩm</h2>
      <div class="category-list">
        <div v-for="category in homePageData.categories" :key="category.id" class="category-card">
          <img
              v-if="category.image"
              :src="`${baseURL}/${category.image}`"
              alt="Category Image"
              width="200px"
          />
          <h3>{{ category.name }}</h3>
          <p>{{ category.quantity }}</p>
          <button @click="viewCategoryProducts(category)">Xem sản phẩm trong danh mục</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axiosInstance from "../../axiosInstance";
import apiConfigCart from "../../store/cart";
import apiConfigHome from "../../store/home";


export default {
  name: "HomePage",
  data() {
    return {
      homePageData: null,
      baseURL: axiosInstance.defaults.baseURL,
    };
  },
  mounted() {
    this.fetchHomePageData();
  },

  methods: {
    async fetchHomePageData() {
      try {
        const response = await apiConfigHome.getHomePageData();

        this.homePageData = response.data;
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    },
    async addToCart(product) {
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
      console.log(`View products in ${category.name} category`);
    },
    viewProductDetail(product) {
      console.log(product)
      const categorySlug = product.category.slug;
      const productSlug = product.slug;
      this.$router.push({ path: `/product-detail/${categorySlug}/${productSlug}` });
    },
  },
};
</script>


<style scoped>
/* Tổng thể layout */
body {
  background-color: #f5f5f5;
  color: #333;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}
product-detail
h1, h2, h3 {
  color: #222;
  margin-bottom: 15px;
  text-align: center; /* Căn giữa các tiêu đề */
}

h1 {
  font-size: 2.5rem;
  margin-top: 20px;
}

h2 {
  font-size: 1.8rem;
}

p {
  color: #555;
  font-size: 1rem;
  margin-bottom: 10px;
}

/* Banner Section */
.banner-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.banner-image {
  width: 395px; /* Đặt kích thước giống với các product-card */
  height: 250px; /* Đặt chiều cao giống với các product-card */
  object-fit: cover; /* Đảm bảo hình ảnh giữ đúng tỉ lệ */
  border-radius: 10px; /* Đồng bộ border-radius */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Đồng bộ shadow */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.banner-image:hover {
  transform: translateY(-5px); /* Thêm hiệu ứng hover để đồng nhất */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

/* Sản phẩm và danh mục */
.product-list, .category-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Căn giữa các sản phẩm */
  gap: 30px;
  padding: 20px;
}

.product-card, .category-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 280px; /* Định kích thước cố định cho các card */
  text-align: center; /* Căn giữa nội dung */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover, .category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.product-card img, .category-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 2px solid #f0f0f0;
}

.product-card h3, .category-card h3 {
  font-size: 1.2rem;
  margin: 10px 0;
}

.product-card p, .category-card p {
  font-size: 0.9rem;
  color: #666;
}

/* Nút bấm */
button {
  margin-top: 10px;
  padding: 12px 16px;
  width: 90%;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e65a50;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-list, .category-list {
    gap: 20px;
  }

  .product-card, .category-card {
    width: 90%;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.8rem;
  }

  .product-card, .category-card {
    width: 100%;
  }

  button {
    font-size: 0.9rem;
  }
}
.discounted-price {
  color: #ff0000; /* Red color to highlight */
  font-weight: bold; /* Bold text */
  font-size: 1.2rem; /* Slightly larger font size */
}
</style>
