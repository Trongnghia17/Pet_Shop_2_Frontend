<template>
  <div class="admin-container">
    <div :class="['sidebar', { 'sidebar-closed': !isSidebarOpen }]">
      <div :class="['logo', { 'logo-closed': !isSidebarOpen }]">
        <img src="../../assets/images/logo.png" alt="Logo" />
      </div>
      <ul class="admin-list" >
        <li class="admin-block"><router-link 
          to="/admin/dashboard"
          active-class="active-link" 
          exact-active-class="exact-active-link">
          <i class="fa-solid fa-chart-line menu-icon"></i>
          <span v-if="isSidebarOpen">Thống kê</span>
        </router-link>
        </li>
        <li class="admin-block"><router-link 
          to="/admin/product"
          active-class="active-link" 
          exact-active-class="exact-active-link">
          <i class="fa-solid fa-paw menu-icon"></i>
          <span v-if="isSidebarOpen">Thú cưng</span> 
        </router-link>
      </li>
        <li class="admin-block"><router-link 
          to="/admin/category"
          active-class="active-link" 
          exact-active-class="exact-active-link">
          <i class="fa-solid fa-layer-group menu-icon"></i>
          <span v-if="isSidebarOpen">Giống loài</span>
        </router-link></li>
        <v-list-item @click="handleEvent('logout')">
          <v-list-item-title class="logout-item">
            <i class="fa-solid fa-right-from-bracket menu-icon logout-icon"></i>
            <span v-if="isSidebarOpen" class="logout-text">Đăng xuất</span>
          </v-list-item-title>
        </v-list-item>
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
import Cookies from "js-cookie";

export default {
  name: "AdminPage",
  data() {
    return {
      isSidebarOpen: false,
      isdashLined: false
    };
  },
  methods: {
    handleEvent(action) {
      if (action === 'logout') {
        Cookies.remove('token');
        Cookies.remove('auth_name');
        this.$router.push("/login");
      }
    },
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
.logout-item{
  color: red;
  text-align: center;
  padding-top: 30px;
}
.menu-icon {
  font-size: 20px;
  margin-right: 20px; /* Khoảng cách giữa icon và text */
}
.sidebar-closed .menu-icon {
  margin-right: 0;
}
</style>