import Vue from "vue";
import VueRouter from 'vue-router';
import {store} from "../store";
import axios from "axios";

Vue.use(VueRouter);


import Header from '../components/Header/Header.vue';
import Nav from '../components/Nav/Nav.vue';
import About from '../components/About/About.vue';
import Login from '../components/Login/Login.vue';
import Works from "../components/Works/Works";
import Reviews from "../components/Reviews/Reviews";

const routes = [
    {
        path: '/',
        components: {
            header: Header,
            nav: Nav,
            default: About
        }
    },
    {
        path: '/login',
        components: {
            default: Login
        },
        meta: {
            public: true
        }

    },
    {
        path: '/works',
        components: {
            header: Header,
            nav: Nav,
            default: Works
        }
    },
    {
        path: '/reviews',
        components: {
            header: Header,
            nav: Nav,
            default: Reviews
        }
    },
];
const router = new VueRouter({routes});
const guard = axios.create({
    baseURL: "https://webdev-api.loftschool.com"
})

router.beforeEach(async (to, from, next) => {
    const isPublicRoute = to.matched.some(route => route.meta.public);
    const isUserLoggedIn = store.getters["user/isUserLoggedIn"];

    if (!isUserLoggedIn) {
        const token = localStorage.getItem('token');
        console.log('tok', token)
        if (!token && isPublicRoute) {
            console.log('1', token)

            next();
        } else if (token) {
            console.log('2', token)

            guard.defaults.headers['Authorization'] = `Bearer ${token}`;
            try {
                const response = await guard.get('/user');
                store.dispatch('user/loginUser', await response.data.user);
                next();
            } catch (error) {
                console.log(error)
                router.replace("/login");
                localStorage.removeItem('token');
            }
        } else {
            console.log('4', token)

            next('/login');
        }

    } else {
        next();
    }
})
export default router;