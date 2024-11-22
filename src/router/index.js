import Vue from 'vue';
// import Cookies from 'js-cookie';
import VueRouter from 'vue-router';
import LoginPage from '../views/Login.vue';
import RegisterPage from '../views/Register.vue';
import HomePage from '@/views/Home.vue';
import IntroducePage from '@/views/Introduce.vue';
import AlbumPage from '@/views/Album.vue';
import CollectionPage from '@/views/Collection.vue';
import ContactPage from '@/views/Contact.vue';
import ShoppingCartPage from '@/views/ShoppingCart.vue';
import ProfilePage from '@/views/Profile.vue';
import AdminPage from '../views/admin/Admin.vue';
import MainPage from '@/views/Main.vue';



Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', meta: { title: "Đăng nhập" }, component: LoginPage },
    { path: '/register', name: 'Register', meta: { title: "Đăng ký" }, component: RegisterPage },
    { path: '/home', name: 'HomePage', component: HomePage },
    { path: '/introduce', name: 'IntroducePage', component: IntroducePage },
    { path: '/album', name: 'AlbumPage', component: AlbumPage },
    { path: '/collection', name: 'CollectionPage', component: CollectionPage },
    { path: '/contact', name: 'ContactPage', component: ContactPage },
    { path: '/shopping-cart', name: 'ShoppingCartPage', component: ShoppingCartPage },
    { path: '/profile', name: 'ProfilePage', component: ProfilePage },
    { path: '/admin', name: 'Admin', component: AdminPage },
    { path: '/main', name: 'Main', component: MainPage },

];

const router = new VueRouter({
    mode: 'history',
    routes,
});
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn && to.path !== "/login" && to.path !== "/register") {
        Vue.prototype.$toast.error("Vui lòng đăng nhập");
        next("/login");
    } else {
        next();
    }
});
export default router;
