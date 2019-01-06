import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = "AUTH TOKEN FROM INSTANCE";

instance.interceptors.request.use(req=>{
    console.log(req);
    return req;
}, error=>{
    console.log(error);
    return Promise.reject(error)
});


instance.interceptors.response.use(res=>{
    console.log(res);
    return res;
}, error=>{
    console.log(error);
    return Promise.reject(error)
});


export default instance;