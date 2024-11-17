import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from '../views/Login.vue';
import RegisterPage from '../views/Register.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/login',
        name: 'Login',
        component: LoginPage },
    { path: '/register', name: 'Register', component: RegisterPage },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
