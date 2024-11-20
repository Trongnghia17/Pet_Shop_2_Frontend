<template>
  <nav class="navbar">
    <ul class="navbar-list">
        <li class="navbar-img">
            <img   alt="logo" class="logo">
        </li>
        <li class="navbar-item">
            <div class="nav-home">
            <router-link 
            to="/home" 
            class="navbar-link" 
            active-class="active-link" 
            exact-active-class="exact-active-link">
            <span class="fa-solid fa-house"></span>Trang chủ</router-link>
            </div>
        </li>
        <li class="navbar-item">
            <router-link 
            to="/introduce"
            class="navbar-link"
            active-class="active-link"
            exact-active-class="exact-active-link">
            <span class="fa-solid fa-circle-info"></span>Giới thiệu</router-link>
        </li>
        <li class="navbar-item">
            <router-link
            to="/album"
            class="navbar-link"
            active-class="active-link"
            exact-active-class="exact-active-link">
            <span class="fa-brands fa-stack-overflow"></span>Album</router-link>
        </li>
        <li class="navbar-item">
            <router-link
            to="/collection"
            class="navbar-link"
            active-class="active-link"
            exact-active-class="exact-active-link">Bộ sưu tập</router-link>
        </li>
        <li class="navbar-item">
            <router-link
            to="/contact"
            class="navbar-link"
            active-class="active-link"
            exact-active-class="exact-active-link">Liên hệ</router-link>
        </li>
        <li class="navbar-item">
            <router-link
            to="shopping-cart"
            class="navbar-link"
            active-class="active-link"
            exact-active-class="exact-active-link">Giỏ hàng</router-link>
        </li>
        <li class="nav-logout">
        <button
          class="icon-button"
          style="color: red; white-space: nowrap"
          @click="handleEvent('logout')"
        >
          <span class="fa-solid fa-sign-out-alt"></span>Đăng xuất
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
// import router from '@/router';

export default {
name: 'AppNavbar',
methods: {
    handleEvent(event) {
        if (event === 'logout') {
            // localStorage.removeItem('token');
            this.$router.push('/login');
        }
    },
},
}
</script>
<style scoped>
.navbar{
    font-family: Arial, Helvetica, sans-serif;
    background-color:white ;
    border-bottom:1px solid #fff ;
    width: 100%;
    padding: 20px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.navbar-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
}
.navbar ul li a{
    text-decoration: none;
    color: black;
}
</style>