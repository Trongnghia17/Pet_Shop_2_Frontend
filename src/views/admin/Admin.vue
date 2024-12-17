<template>
  <div class="admin-container">
    <div :class="['sidebar', { 'sidebar-closed': !isSidebarOpen }]">
      <div :class="['logo', { 'logo-closed': !isSidebarOpen }]">
        <img src="../../assets/images/logo.png" alt="Logo" />
      </div>
      <v-list class="admin-list" >
        <v-list-item class="list-menu" @click="handleEvent('/admin/dashboard')" :class="{ 'active-link': isActive('/admin/dashboard') }">
          <v-list-item-icon>
            <i class="fa-solid fa-chart-line menu-icon"></i>
          </v-list-item-icon>
          <v-list-item-content class="title" v-if="isSidebarOpen">
            <v-list-item-title >Thống kê</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="list-menu" @click="handleEvent('/admin/product')" :class="{ 'active-link': isActive('/admin/product') }">
          <v-list-item-icon>
            <i class="fa-solid fa-paw menu-icon"></i>
          </v-list-item-icon>
          <v-list-item-content class="title" v-if="isSidebarOpen">
            <v-list-item-title>Thú cưng</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="list-menu" @click="handleEvent('/admin/category')" :class="{ 'active-link': isActive('/admin/category') }">
          <v-list-item-icon>
            <i class="fa-solid fa-layer-group menu-icon"></i>
          </v-list-item-icon>
          <v-list-item-content class="title" v-if="isSidebarOpen">
            <v-list-item-title>Giống loài</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="list-menu" @click="handleEvent('logout')">
          <v-list-item-icon>
            <i class="fa-solid fa-right-from-bracket logout-icon"></i>
          </v-list-item-icon>
          <v-list-item-content class="logout-item" v-if="isSidebarOpen">
            <v-list-item-title class="logout-text">Đăng xuất</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
    isActive(route) {
      return this.$route.path === route;
    },
    handleEvent(action) {
      switch(action){
        case '/admin/dashboard':
        if (this.$route.path !== "/admin/dashboard") {
            this.$router.push("/admin/dashboard");
          }
          break;
        case '/admin/product':
        if (this.$route.path !== "/admin/product") {
            this.$router.push("/admin/product");
          }
          break;
        case '/admin/category':
        if (this.$route.path !== "/admin/category") {
            this.$router.push("/admin/category");
          }
          break;
        case 'logout':
        Cookies.remove('token');
        Cookies.remove('auth_name');
        this.$router.push("/login");
          break;
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
.sidebar {
  height: 100vh;
  width: 180px;
  transition: width 0.3s;
  background-color: #2c3e50;
  color: white; 
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
  padding: 0;
}
.list-menu{
  background-color:#2c3e50 ;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
}
.list-menu:hover{
  background-color: #315b84;
}
.sidebar .list-menu {
  width: 180px;
  transition: width 0.3s;
}
.sidebar-closed .list-menu {
  width: 100px;
  transition: width 0.3s;
  justify-content: center;
}
.main-content {
  flex-grow: 1;
  padding: 20px;
}
.logo img {
  max-width: 200px; 
  height: auto;
  padding-top: 20px;
}
.logo-closed img {
  max-width: 100px; 
  height: auto;
}
.logout-item{
  color: red;
}
.menu-icon {
  font-size: 35px;
  color: white;
}
.logout-icon {
  font-size: 35px;
  color: red;
}
.logout-tex
.sidebar-closed .menu-icon {
  margin-right: 0;
}
.active-link {
  background-color: white;
}
.active-link .menu-icon {
  color: black; 
}
.active-link .title {
  color: black;
}
.title {
  color: white;
}
</style>