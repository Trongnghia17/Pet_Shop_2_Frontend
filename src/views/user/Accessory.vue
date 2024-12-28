<template>
  <div class="accessory">

      <v-row style="width: 1250px">
      <v-spacer></v-spacer>
      <v-col cols="4" class="pr-0 pb-0" style="padding-left: 0px; padding-top: 25px">
        <v-text-field
            hide-details=""
            outlined
            dense
            v-model="name"
            label="Tên sản phẩm thú cưng"
            :append-icon="'mdi-magnify'"
            @keydown.enter="search"
            @keyup="searchEmpty"
        ></v-text-field>
      </v-col>
      </v-row>


    <div class="container">
      <v-row>
        <v-col cols="3">
          <div class="sidebar">
            <h3>DANH MỤC SẢN PHẨM</h3>
            <ul>
              <li v-for="category in homePageData.categories" :key="category.id">
                <button @click="viewCategoryProducts(category)">{{ category.name }} <span>({{category.products.length}})</span></button>
              </li>
            </ul>

          </div>

        </v-col>
        <v-col cols="9">
          <div >
            <div class="products">
              <div
                  class="product-card"
                  v-for="product in selectedCategoryProducts"
                  :key="product.id"
                  @click="viewProductDetail(product)"
              >
                <img
                    :src="`${baseURL}/${product.image}`"
                    alt="Product Image"
                    width="200px"
                />
                <h3>{{ product.name }}</h3>
                <div> Số lượng {{ product.quantity }}</div>
                <div>Giá gốc: {{ product.original_price }} VND</div>
                <div class="discounted-price">Giảm còn: {{ product.selling_price }} VND</div>
                <button class="btn" @click="addToCart(product)">Thêm vào giỏ</button>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>


    </div>
  </div>
</template>

<script>
import axiosInstance from "../../axiosInstance";
import apiConfigCart from "../../store/cart";
import apiConfigHome from "../../store/home";
import {isNullOrEmpty} from "@/utils/validators";
import Cookies from "js-cookie";

export default {
  name: "AccessoryComponent",
  data() {
    return {
      homePageData: null,
      baseURL: axiosInstance.defaults.baseURL,
      selectedCategoryProducts: [],
      name: "",
    };
  },
  mounted() {
    this.fetchHomePageData();
  },
  methods: {
    search() {
      this.fetchHomePageData()
    },
    searchEmpty() {
      setTimeout(() => {
        if (isNullOrEmpty(this.name)) {
          this.search()
        }
      }, 10)
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
    },
    viewProductDetail(product) {
      const categorySlug = product.category.slug;
      const productSlug = product.slug;
      this.$router.push({ path: `/product-detail/${categorySlug}/${productSlug}` });
    },
  },
}
</script>
<style scoped>
.accessory {
  margin: 0 auto;
  width: 1250px;
}
.container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding: 25px 0px 0px 0px;
}
.sidebar {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  margin: 10px 0;
}

.sidebar span {
  font-size: 14px;
}
.product-section {
  flex: 1;
}
.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}
.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 2px solid #f0f0f0;
}
.product-card h4 {
  font-size: 16px;
  margin: 10px 0;
}
.product-card p {
  font-size: 14px;
  color: #666;
}

.product-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.btn {
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
.discounted-price {
  color: #ff0000; /* Red color to highlight */
  font-weight: bold; /* Bold text */
  font-size: 1.2rem; /* Slightly larger font size */
}


</style>
