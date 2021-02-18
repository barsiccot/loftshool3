import axios from 'axios';

axios.defaults.baseURL= "https://webdev-api.loftschool.com";
const token = localStorage.getItem('token') || '';
console.log('401',token)

if(token){
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        console.log('404',token)

}


axios.interceptors.response.use(

    response => (response),
   async error => {
        const originRequest = error.config;
           console.log('40k1',error)

           if (error.response.status === 401) {
                const response = await axios.post('/refreshToken');
                console.log('404i',response.data)
                const token = response.data.token;
                localStorage.setItem('token', token);
                axios.defaults.headers['Authorization'] = `Bearer ${token}`;
                originRequest.headers['Authorization'] = `Bearer ${token}`;

                return axios(originRequest);
        }

        return Promise.reject(error);
    }
);
export default axios;