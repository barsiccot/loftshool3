import Header from '../components/Header/Header.vue';
import Nav from '../components/Nav/Nav.vue';
import About from '../components/About/About.vue';
import Login from '../components/Login/Login.vue';

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

    }
];

export default routes;