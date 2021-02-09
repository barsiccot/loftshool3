import axios from 'axios';

const $axios = axios.create({
    baseURL: "https://webdev-api.loftschool.com"
});
const token = localStorage.getItem('token') || '';
if(token){
    $axios.defaults.headers['Authorization'] = `Bearer ${token}`;

}
export default $axios;