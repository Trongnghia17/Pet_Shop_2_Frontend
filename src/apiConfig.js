import axiosInstance from './axiosInstance';
import Cookies from 'js-cookie';

const apiConfig = {
    login: (data) => axiosInstance.post('/api/login', data),
    register: (data) => axiosInstance.post('/api/register', data),
    getQrCode: (data) => axiosInstance.post('/api/get-qr-code', data),
    getAllCategory: (data) => {
        return axiosInstance.get('/api/view-category', data,{
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
                "Content-Type": "multipart/form-data",
                Authorization:
                    Cookies.get('token') != (null || undefined)
                        ? `Bearer ${Cookies.get('token')}`
                        : '',
            },
        });
    },
    updateCategory: (id, data) => {
        return axiosInstance.put(`/api/update-category/${id}`, data, {
            headers: {
                Authorization:
                    Cookies.get('token') != (null || undefined)
                        ? `Bearer ${Cookies.get('token')}`
                        : '',
            },
        });
    },
    deleteCategory: (id) => {
        return axiosInstance.delete(`/api/delete-category/${id}`, {
            headers: {
                Authorization:
                    Cookies.get('token') != (null || undefined)
                        ? `Bearer ${Cookies.get('token')}`
                        : '',
            },
        });
    },
    getAllProduct: (data ) => {
        return axiosInstance.get('/api/view-product', data,{
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
                'Access-Control-Allow-Origin': '*',
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
                'Access-Control-Allow-Origin': '*',
                Authorization:
                    Cookies.get('token') != (null || undefined)
                        ? `Bearer ${Cookies.get('token')}`
                        : '',
            },
        });
    },
    getHomePageData: () => {
        return axiosInstance.get('/api/viewHomePage', {
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
