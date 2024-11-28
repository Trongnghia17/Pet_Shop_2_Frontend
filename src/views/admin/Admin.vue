<template>
  <div class="admin-container">
    <div :class="['sidebar', { 'sidebar-closed': !isSidebarOpen }]">
      <div :class="['logo', { 'logo-closed': !isSidebarOpen }]">
        <img src="../../assets/images/logo.png" alt="Logo" />
      </div>
      <ul class="admin-list" v-if="isSidebarOpen">
        <li class="admin-block"><router-link 
          to="/admin/dashboard"
          active-class="active-link" 
          exact-active-class="exact-active-link">Thống kê
        </router-link>
        </li>
        <li class="admin-block"><router-link 
          to="/admin/product"
          active-class="active-link" 
          exact-active-class="exact-active-link">
          Thú cưng
        </router-link>
      </li>
        <li class="admin-block"><router-link 
          to="/admin/category"
          active-class="active-link" 
          exact-active-class="exact-active-link">
          Giống loài
        </router-link></li>

      </ul>
    </div>
    <div class="main-content">
      <div class="nav-toggle">
        <button class="icon-button" @click="toggleMenu">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminPage",
  data() {
    return {
      isSidebarOpen: false,
      isdashLined: false
    };
  },
  methods: {
    toggleMenu() {
      this.isSidebarOpen = !this.isSidebarOpen;
      this.isdashLined= !this.isdashLined;
    }
  }
};
</script>

<style scoped>
.admin-container {
  display: flex;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.admin-container .admin-list li a{
  text-decoration: none;
  color: white;
}
.sidebar {
  height: 100vh;
  width: 250px;
  transition: width 0.3s;
  background-color: #2c3e50;
  color: white; 
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.sidebar-closed {
  width: 100px;
}

.nav-toggle {
  display: flex;
  justify-content: left;
  height: 50px;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
}

.admin-list {
  list-style: none;
  padding: 0;
}

.admin-block {
  padding: 30px;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}
.logo img {
  max-width: 150px; /* Điều chỉnh kích thước logo */
  height: auto;
}
.logo-closed img {
  max-width: 70px; /* Kích thước logo khi sidebar đóng */
  height: auto;
}
</style>