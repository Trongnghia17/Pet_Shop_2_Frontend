<template>
  <div id="app">
    <Navbar v-if="showNavbar"></Navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from './views/Navbar.vue'


export default {
  components: { Navbar },
  name: 'App',
  computed: {
    showNavbar() {
      const path = this.$route.path;
      {
        return path !== '/login' && path !== '/register';
      }
    }
  }

}
</script>

<style>
</style>
