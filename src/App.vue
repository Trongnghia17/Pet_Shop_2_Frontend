<template>
  <div id="app" data-app>
    <Navbar v-if="showNavbar"></Navbar>
  <div class="app-container">
    <router-view />
  </div>
  <Footer v-if="showFooter"></Footer>
  </div>
</template>

<script>

import Navbar from './views/Navbar.vue'
import Footer from "./views/Footer.vue";
export default {
  components: { Navbar },
  name: 'App',
  computed: {
    showNavbar() {
      const path = this.$route.path;
      {
        return path !== '/login' && path !== '/register';
      }
    },
    showFooter() {
      const path = this.$route.path;
      return (
        path !== "/login" &&
        path !== "/register"
      );
    },
  }

}

</script>
<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>