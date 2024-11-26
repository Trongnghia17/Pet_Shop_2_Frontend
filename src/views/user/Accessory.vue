<template>
  <div class="accessory">
    <!-- Header -->
    <header>
      <nav>
        <a href="#">Trang chủ</a> > <span>Phụ Kiện</span>
      </nav>
    </header>

    <!-- Main content -->
    <div class="container">
      <!-- Sidebar (Navbar) -->
      <aside class="sidebar">
        <h3>DANH MỤC SẢN PHẨM</h3>
        <ul>
          <li v-for="(item, index) in categories" :key="index">
            {{ item.name }} <span>({{ item.count }})</span>
          </li>
        </ul>

        <!-- Price Slider -->
        <div class="filter">
          <h3>GIÁ</h3>
          <div class="price-slider">
            <input
                type="range"
                v-model="priceRange.min"
                :min="0"
                :max="maxPrice"
                step="10000"
            />
            <input
                type="range"
                v-model="priceRange.max"
                :min="0"
                :max="maxPrice"
                step="10000"
            />
            <div class="filter-info">
              Giá: {{ formatPrice(priceRange.min) }}đ - {{ formatPrice(priceRange.max) }}đ
            </div>
          </div>
        </div>

        <!-- Color Filter -->
        <div class="filter">
          <h3>MÀU SẮC</h3>
          <div v-for="(color, index) in colors" :key="index">
            <input
                type="checkbox"
                :id="color"
                :value="color"
                v-model="selectedColors"
            />
            <label :for="color">{{ color }}</label>
          </div>
        </div>

        <!-- Filter Button -->
        <button class="filter-button" @click="applyFilters">LỌC</button>
      </aside>

      <!-- Product Grid -->
      <div class="product-section">
        <!-- Controls -->
        <div class="controls">
          <div class="control-group">
            <button class="dropdown-button" @click="toggleSortDropdown">
              Sắp xếp
            </button>
            <div v-if="showSortDropdown" class="dropdown-content">
              <div class="control-group">
                <label for="sort">Sắp xếp:</label>
                <select id="sort" @change="sortProducts($event)">
                  <option value="popular">Độ Phổ Biến</option>
                  <option value="low-to-high">Giá: Thấp đến Cao</option>
                  <option value="high-to-low">Giá: Cao đến Thấp</option>
                </select>
              </div>
            </div>
          </div>
          <div class="control-group">
            <button class="dropdown-button" @click="toggleCountDropdown">
              Số sản phẩm
            </button>
            <div v-if="showCountDropdown" class="dropdown-content">
              <div class="control-group">
                <label for="count">Số sản phẩm:</label>
                <select id="count" @change="updateProductCount($event)">
                  <option :value="filteredProducts.length">{{ filteredProducts.length }} sản phẩm</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Product cards -->
        <div class="products">
          <div
              class="product-card"
              v-for="(product, index) in filteredProducts"
              :key="index"
              @click="$router.push('/shopping-cart')"
          >
            <img :src="product.image" :alt="product.name" />
            <h4>{{ product.name }}</h4>
            <p>ID:{{ product.id }}</p>
            <p>{{ formatPrice(product.price) }}đ</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccessoryComponent",
  data() {
    return {
      categories: [
        { name: "Phụ Kiện", count: 12 },
        { name: "Áo", count: 9 },
        { name: "Bàn Cào", count: 5 },
        { name: "Bát", count: 11 },
        { name: "Đồ Chơi", count: 6 },
        { name: "Đồ Dùng Vệ Sinh", count: 13 },
      ],
      products: [
        { id: "SP101051", name: "Khay vệ sinh tai mèo", price: 240000, color: "Xanh", image: "../../src/assets/khanto.jpg" },
        { id: "SP101052", name: "Khăn tắm lớn có hộp", price: 60000, color: "Hồng", image: "path/to/image2.jpg" },
        { id: "SP101053", name: "Khăn tắm nhỏ có hộp", price: 50000, color: "Vàng", image: "path/to/image3.jpg" },
        { id: "SP101054", name: "Đồ Chơi - Gà hết trùng", price: 35000, color: "Đỏ", image: "path/to/image4.jpg" },
        { id: "SP101055", name: "Bàn chải massage", price: 50000, color: "Xanh", image: "path/to/image5.jpg" },
        { id: "SP101056", name: "Bỉm cho thú cưng", price: 140000, color: "Trắng", image: "path/to/image6.jpg" },
        { id: "SP101057", name: "Dây xích thú cưng", price: 90000, color: "Đỏ", image: "path/to/image7.jpg" },
        { id: "SP101058", name: "Bát ăn đôi cho chó mèo", price: 120000, color: "Xanh", image: "path/to/image8.jpg" },
        { id: "SP101059", name: "Áo len cho thú cưng", price: 80000, color: "Hồng", image: "path/to/image9.jpg" },
        { id: "SP101060", name: "Nhà cây cho mèo", price: 500000, color: "Nâu", image: "path/to/image10.jpg" },
        { id: "SP101061", name: "Đồ chơi bóng lăn cho mèo", price: 45000, color: "Vàng", image: "path/to/image11.jpg" },
        { id: "SP101062", name: "Giường cho thú cưng", price: 300000, color: "Xám", image: "path/to/image12.jpg" }
      ],
      filteredProducts: this.products,
      priceRange: { min: 0, max: 1000000 },
      maxPrice: 1000000,
      colors: ["Xanh", "Hồng", "Vàng", "Đỏ", "Trắng", "Nâu", "Xám"],
      selectedColors: [], // Màu sắc được chọn
      showSortDropdown: false,
      showCountDropdown: false,
    };
  },
  methods: {
    // Áp dụng bộ lọc
    applyFilters() {
      this.filteredProducts = this.products.filter((product) => {
        const isWithinPriceRange =
            product.price >= this.priceRange.min && product.price <= this.priceRange.max;
        const isColorMatched =
            this.selectedColors.length === 0 || this.selectedColors.includes(product.color);
        return isWithinPriceRange && isColorMatched;
      });
    },
    // Sắp xếp sản phẩm
    sortProducts(event) {
      const sortBy = event.target.value;
      if (sortBy === "low-to-high") {
        this.filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === "high-to-low") {
        this.filteredProducts.sort((a, b) => b.price - a.price);
      } else {
        this.filteredProducts = [...this.products];
      }
    },
    // Cập nhật số lượng sản phẩm hiển thị
    updateProductCount(event) {
      const count = parseInt(event.target.value);
      this.filteredProducts = this.products.slice(0, count);
    },
    // Định dạng giá tiền
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN").format(price);
    },
    // Toggle sort dropdown visibility
    toggleSortDropdown() {
      this.showSortDropdown = !this.showSortDropdown;
    },
    // Toggle count dropdown visibility
    toggleCountDropdown() {
      this.showCountDropdown = !this.showCountDropdown;
    },
  },
  created() {
    this.filteredProducts = [...this.products];
  },
};
</script>

<style>
/* General Styling */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;
}

/* Header */
header {
  padding: 10px 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

header nav {
  font-size: 14px;
  color: #555;
}

header nav a {
  text-decoration: none;
  color: #ff6f61;
  font-weight: bold;
}

header nav span {
  color: #333;
  font-weight: bold;
}

/* Main container */
.container {
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-wrap: wrap;
}

/* Sidebar (Navbar) */
.sidebar {
  width: 300px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.sidebar h3 {
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: bold;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
}

.sidebar span {
  color: gray;
  font-size: 14px;
}

.filter {
  margin: 20px 0;
}

.filter-info {
  margin: 10px 0;
  font-size: 14px;
}

.filter-button {
  padding: 10px 15px;
  font-size: 14px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.filter-button:hover {
  background-color: #e05b4f;
}

/* Product Section */
.product-section {
  flex: 1;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.dropdown-button {
  padding: 10px 15px;
  font-size: 14px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dropdown-button:hover {
  background-color: #e05b4f;
}

.dropdown-content {
  margin-top: 10px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
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
  height: auto;
  border-radius: 8px;
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

/* Responsive Styling */
@media (max-width: 1024px) {
  .container {
    flex-direction: column;
    padding: 10px;
  }

  .sidebar {
    width: 100%;
    margin-bottom: 20px;
  }

  .products {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .products {
    grid-template-columns: 1fr;
  }

  .filter-button,
  .dropdown-button {
    width: 100%;
    padding: 12px 0;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  header {
    flex-direction: column;
    text-align: center;
  }

  .container {
    padding: 5px;
  }

  .product-card {
    padding: 10px;
  }
}
</style>
