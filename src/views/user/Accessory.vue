<template>
  <div class="accessory">
    <!-- Header -->
    <header>
      <nav>
        <a href="#">Trang chủ</a> > <span>Phụ Kiện</span>
      </nav>
    </header>

    <!-- Thanh tìm kiếm -->
    <div class="search-bar">
      <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          v-model="searchQuery"
          @input="filterProducts"
      />
    </div>

    <!-- Main content -->
    <div class="container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <h3>DANH MỤC SẢN PHẨM</h3>
        <ul>
          <li v-for="(item, index) in categories" :key="index">
            {{ item.name }} <span>({{ item.count }})</span>
          </li>
        </ul>
      </aside>

      <!-- Product Grid -->
      <div class="product-grid">
        <!-- Controls -->
        <div class="controls">
          <select @change="sortProducts($event)">
            <option value="popular">Sắp Xếp Theo Độ Phổ Biến</option>
            <option value="low-to-high">Giá: Thấp đến Cao</option>
            <option value="high-to-low">Giá: Cao đến Thấp</option>
          </select>
          <select @change="updateProductCount($event)">
            <option value="16">16 sản phẩm</option>
            <option value="32">32 sản phẩm</option>
          </select>
        </div>

        <!-- Product cards -->
        <div class="products">
          <div
              class="product-card"
              v-for="(product, index) in filteredProducts"
              :key="index"
          >
            <img :src="product.image" :alt="product.name" />
            <h4>{{ product.name }}</h4>
            <p>{{ product.price }}đ</p>
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
      searchQuery: "", // Giá trị tìm kiếm
      categories: [
        { name: "Balo", count: 6 },
        { name: "Cát Vệ Sinh", count: 3 },
        { name: "Chó Chow Chow", count: 11 },
        { name: "Chuồng", count: 15 },
        { name: "Danh Mục Cún", count: 507 },
        { name: "Danh Mục Mèo", count: 87 },
        { name: "Dây Vòng Cổ", count: 5 },
        { name: "Mỹ Phẩm & Làm Đẹp", count: 12 },
        { name: "Nệm", count: 11 },
        { name: "Phụ Kiện", count: 154 },
      ],
      products: [
        { id: 1, name: "Khay vệ sinh tai mèo", price: 240000, image: "path/to/image1.jpg" },
        { id: 2, name: "Khăn tắm lớn có hộp", price: 60000, image: "path/to/image2.jpg" },
        { id: 3, name: "Khăn tắm nhỏ có hộp", price: 50000, image: "path/to/image3.jpg" },
        // Thêm nhiều sản phẩm tại đây
      ],
      filteredProducts: [], // Sản phẩm sau khi lọc
      productCount: 16,
    };
  },
  methods: {
    // Lọc sản phẩm theo từ khóa tìm kiếm
    filterProducts() {
      const query = this.searchQuery.toLowerCase();
      this.filteredProducts = this.products.filter((product) =>
          product.name.toLowerCase().includes(query)
      );
    },
    // Sắp xếp sản phẩm
    sortProducts(event) {
      const sortBy = event.target.value;
      if (sortBy === "low-to-high") {
        this.filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === "high-to-low") {
        this.filteredProducts.sort((a, b) => b.price - a.price);
      } else {
        this.filteredProducts = [...this.products]; // Độ phổ biến giữ nguyên thứ tự gốc
      }
    },
    // Cập nhật số lượng sản phẩm hiển thị
    updateProductCount(event) {
      this.productCount = parseInt(event.target.value);
      this.filteredProducts = this.products.slice(0, this.productCount);
    },
  },
  created() {
    // Khởi tạo danh sách sản phẩm hiển thị
    this.filteredProducts = this.products.slice(0, this.productCount);
  },
};
</script>

<style>
/* Header styles */
header {
  padding: 20px;
  background-color: #f5f5f5;
}
nav {
  font-size: 14px;
}
.search-bar {
  margin: 20px;
  text-align: center;
}
.search-bar input {
  width: 80%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.container {
  display: flex;
  gap: 20px;
  padding: 20px;
}
.sidebar {
  width: 250px;
  background: #f9f9f9;
  padding: 20px;
  border: 1px solid #ccc;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  margin: 10px 0;
}
.product-grid {
  flex: 1;
}
.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
.product-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}
.product-card img {
  width: 100%;
}
.product-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
