<template>
  <nav class="navbar">
    <ul class="navbar-list">
        <li class="navbar-img">
            <img src="../assets/images/logo.png" alt="logo" class="logo">
        </li>
        <li class="navbar-item">
            <div class="nav-home">
            <router-link 
            to="/home" 
            class="navbar-link" 
            active-class="active-link" 
            exact-active-class="exact-active-link">
            <span style="margin-right: 8px; font-size: 20px;" class="fa-solid fa-house"></span>Trang chủ</router-link>
            </div>
        </li>
        <li class="navbar-item">
            <router-link 
            to="/introduce"
            class="navbar-link"
            active-class="active-link"
            exact-active-class="exact-active-link">
            <span style="margin-right: 8px;font-size: 20px;" class="fa-solid fa-circle-info"></span>Giới thiệu</router-link>
        </li>
        <li class="navbar-item">
            <router-link
            to="/album"
            class="navbar-link"
            active-class="active-link"
            exact-active-class="exact-active-link">
            <span style="margin-right: 8px;font-size: 20px;" class="fa-brands fa-stack-overflow"></span>Album</router-link>
        </li>
        <li class="navbar-item">
            <router-link
            to="/accessory"
            class="navbar-link"
            active-class="active-link"
            exact-active-class="exact-active-link">
            <span style="margin-right: 8px;font-size: 20px;" class="fa-solid fa-image"></span>Phụ kiện</router-link>
        </li>
        <li class="navbar-item">
            <router-link
            to="/contact"
            class="navbar-link"
            active-class="active-link"
            exact-active-class="exact-active-link">
            <span style="margin-right: 8px;font-size: 20px;" class="fa-solid fa-phone"></span>Liên hệ</router-link>
        </li>
        <li class="navbar-item">
            <router-link
            to="shopping-cart"
            class="navbar-link"
            active-class="active-link"
            exact-active-class="exact-active-link">
            <span style="margin-right: 8px;font-size: 20px;" class="fa-solid fa-cart-shopping"></span>Giỏ hàng</router-link>
        </li>
        <div class="nav-avatar">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            v-bind="attrs"
            v-on="on"
            size="40"
            class="cursor-pointer"
          >
            <img src="../assets/images/avatar.png" alt="User Avatar" class="avatar-img">
          </v-avatar>
        </template>
        <v-list class="avatar-list">
          <v-list-item  @click="handleEvent('profile')">
            <v-list-item-title class="profile-item"><span>Thông tin cá nhân</span></v-list-item-title>
          </v-list-item>
          <v-list-item  @click="handleEvent('logout')">
            <v-list-item-title class="logout-item" style="color: red;"><span style="margin-right: 8px; color: red;" class="fa-solid fa-sign-out-alt logout-icon"></span>Đăng xuất</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    </ul>
  </nav>
</template>

<script>

import Cookies from 'js-cookie';

export default {
name: 'AppNavbar',
methods: {
    handleEvent(action) {
      if (action === 'profile') {
        this.$router.push('/profile');
      } else if (action === 'logout') {
        Cookies.remove('token');
        Cookies.remove('auth_name');
        this.$router.push("/login");
      }
    }
},
}
</script>
<style scoped>
.logo{
    width: 120px;
    height: auto;
}
.navbar{
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    background-color:white ;
    border-bottom:1px solid white;
    width: 100%;
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
.navbar-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
    padding: 0 50px;
}
.navbar ul li a{
    text-decoration: none;
    color: black;
    font-size: 15px;
    transition: color 0.3s, font-weight 0.3s;
}
.navbar ul li a:hover{
    color: #ff7070;
    font-weight: bold;
}
.navbar-item .active-link{
    color:#ff7070;
    font-weight: bold;
    border-bottom:2px solid #ff7070;
    padding-bottom: 5px;
}
.nav-logout{
    font-size: 15px;
    cursor: pointer;
    color: white;
    transition: font-weight 0.3s;
    position: absolute;
    top: 0;
    right: 0;
    margin: 20px 20px;
}
.nav-logout:hover{
    font-weight: bold;
}
.navbar-text{
    display: flex;
    flex-direction: column;
}
.navbar-item{
    margin: 20px;
}
.nav-avatar{
    margin-right: 30px;
}
.avatar-list{
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 15px;
}
.profile-item{
    color: black;
    transition: color 0.3s, font-weight 0.3s;
}
.profile-item:hover{
    color: #ff7070;
    font-weight: bold;
}
.logout-item:hover{
    font-weight: bold;
    transition: color 0.3s, font-weight 0.3s;
}
</style>