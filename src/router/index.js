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
import DashboardPage from '../views/admin/Dashboard.vue';
import ProductPage from '../views/admin/Product.vue';
import CategoryPage from '../views/admin/Category.vue';
Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/home' },
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
                { path: 'dashboard', name: 'DashboardPage', component: DashboardPage },
                { path: 'product', name: 'ProductPage', component: ProductPage },
                { path: 'category', name: 'CategoryPage', component: CategoryPage },
            ]
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});
router.beforeEach((to, from, next) => {
    const isLoggedIn = Cookies.get("token");
    const requiresAuth = ['/shopping-cart', '/admin', '/admin/dashboard', '/admin/product', '/admin/category'];
    if (requiresAuth.some(route => to.path.startsWith(route)) && !isLoggedIn) {
        Vue.prototype.$toast.error("Vui lòng đăng nhập để tiếp tục.");
        next('/login');
    } else {
        next();
    }
});


export default router;
