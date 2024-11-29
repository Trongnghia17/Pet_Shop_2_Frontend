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
    getAllProduct: () => {
        return axiosInstance.get('/api/view-product', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization:
                    Cookies.get('token') != (null || undefined)
                        ? `Bearer ${Cookies.get('token')}`
                        : '',
            },
        });
    },
    addProduct: (data) => {
        return axiosInstance.post('/api/store-product', data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization:
                    Cookies.get('token') != (null || undefined)
                        ? `Bearer ${Cookies.get('token')}`
                        : '',
            },
        });
    },
    updateProduct: (id, data) => {
        return axiosInstance.put(`/api/update-product/${id}`, data, {
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                Authorization:
                    Cookies.get('token') != (null || undefined)
                        ? `Bearer ${Cookies.get('token')}`
                        : '',
            },
        });
    },
    deleteProduct: (id) => {
        return axiosInstance.delete(`/api/delete-product/${id}`, {
            headers: {
                Authorization:
                    Cookies.get('token') != (null || undefined)
                        ? `Bearer ${Cookies.get('token')}`
                        : '',
            },
        });
    },

};

export default apiConfig;
