import Vue from 'vue';
import Cookies from 'js-cookie';
import VueRouter from 'vue-router';
import LoginPage from '../views/auth/Login.vue';
import RegisterPage from '../views/auth/Register.vue';
import HomePage from '../views/user/Home.vue';
import IntroducePage from '../views/user/Introduce.vue';
import AlbumPage from '../views/user/Album.vue';
import CollectionPage from '../views/user/Collection.vue';
import ContactPage from '../views/user/Contact.vue';
import ShoppingCartPage from '../views/user/ShoppingCart.vue';
import ProfilePage from '../views/user/Profile.vue';
import AdminPage from '../views/admin/Admin.vue';
import AccessoryPage from '../views/user/Accessory.vue';
import StatisticalPage from '../views/admin/Statistical.vue';
import PetPage from '../views/admin/Pet.vue';
import SpeciesPage from '../views/admin/Species.vue';
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
    { path: '/accessory', name: 'Accessory', component: AccessoryPage },
    {
        path: '/admin', name: 'Admin', component: AdminPage,
        children:
            [
                { path: 'statistical', name: 'Statistical', component: StatisticalPage },
                { path: 'pet', name: 'PetPage', component: PetPage },
                { path: 'species', name: 'SpeciesPage', component: SpeciesPage },
            ]
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});
router.beforeEach((to, from, next) => {
    const isLoggedIn = Cookies.get("auth_token");
    if (isLoggedIn && (to.path === "/login" || to.path === "/register")) {
        Vue.prototype.$toast.info("Bạn đã đăng nhập!");
        next("/home"); // Chuyển hướng đến trang chủ hoặc trang khác
    }
    // Nếu chưa đăng nhập và truy cập các trang khác login/register
    else if (!isLoggedIn && to.path !== "/login" && to.path !== "/register") {
        Vue.prototype.$toast.error("Vui lòng đăng nhập");
        next("/login"); // Chuyển hướng đến trang đăng nhập
    }
    // Cho phép truy cập nếu không vi phạm điều kiện trên
    else {
        next();
    }
});

export default router;
