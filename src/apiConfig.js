import axiosInstance from './axiosInstance';
import Cookies from 'js-cookie';

const apiConfig = {
    login: (data) => axiosInstance.post('/api/login', data),
    register: (data) => axiosInstance.post('/api/register', data),
    getAllCategory: () => {
        return axiosInstance.get('/api/view-category', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization:
                    Cookies.get('token') != (null || undefined)
                        ? `Bearer ${Cookies.get('token')}`
                        : '',
            },
        });
    },
    addCategory: (data) => {
        return axiosInstance.post('/api/store-category', data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization:
                    Cookies.get('token') != (null || undefined)
                        ? `Bearer ${Cookies.get('token')}`
                        : '',
            },
        });
    },

};

export default apiConfig;
