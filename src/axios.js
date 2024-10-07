import axios from 'axios';
import router from './router';
import Vuesax from 'vuesax';
import Vue from 'vue';

Vue.use(Vuesax);
const vuesaxInstance = new Vue();

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

// Interceptor para añadir el token de autorización en cada petición
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Interceptor para manejar errores de respuesta
instance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        //window.location.href = "/";
        vuesaxInstance.$vs.notify({
            title: "Error de conexión",
            text: "No se pudo recuperar la sesión.",
            color: 'danger',
            icon: 'warning',
            position: 'bottom-center',
            time: 5000,
        });

        if (router.currentRoute.path !== '/') {
            router.push('/');
        } else {
            window.location.reload();
        }

    }
    return Promise.reject(error);
});


export default instance;