import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from '../views/Login.vue';
import RegisterPage from '../views/Register.vue';
import HomePage from '@/views/Home.vue';
import IntroducePage from '@/views/Introduce.vue';
import AlbumPage from '@/views/Album.vue';
import CollectionPage from '@/views/Collection.vue';
import ContactPage from '@/views/Contact.vue';
import ShoppingCartPage from '@/views/ShoppingCart.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/login'},
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/register', name: 'Register', component: RegisterPage },
    { path: '/home', name: 'HomePage', component: HomePage },
    { path: '/introduce', name: 'IntroducePage', component: IntroducePage },
    { path: '/album', name: 'AlbumPage', component: AlbumPage },
    { path: '/collection', name: 'CollectionPage', component: CollectionPage },
    { path: '/contact', name: 'ContactPage', component: ContactPage },
    { path: '/shopping-cart', name: 'ShoppingCartPage', component: ShoppingCartPage },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
