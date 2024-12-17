import axiosInstance from './axiosInstance';
import Cookies from 'js-cookie';

// Utility function to get Authorization headers
const getAuthHeaders = () => {
    const token = Cookies.get('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const apiConfig = {
    // Login and Register
    login: (data) => axiosInstance.post('/api/login', data),
    register: (data) => axiosInstance.post('/api/register', data),

    // Category-related API methods
    getAllCategory: (params) => {
        return axiosInstance.get('/api/view-category', {
            params,
            headers: getAuthHeaders(),
        });
    },

    addCategory: (data) => {
        return axiosInstance.post('/api/store-category', data, {
            headers: {
                "Content-Type": "multipart/form-data",
                ...getAuthHeaders(),
            },
        });
    },

    updateCategory: (id, data) => {
        return axiosInstance.put(`/api/update-category/${id}`, data, {
            headers: getAuthHeaders(),
        });
    },

    deleteCategory: (id) => {
        return axiosInstance.delete(`/api/delete-category/${id}`, {
            headers: getAuthHeaders(),
        });
    },

    // Product-related API methods
    getAllProduct: (params) => {
        return axiosInstance.get('/api/view-product', {
            params,
            headers: getAuthHeaders(),
        });
    },

    addProduct: (data) => {
        return axiosInstance.post('/api/store-product', data, {
            headers: {
                "Content-Type": "multipart/form-data",
                ...getAuthHeaders(),
            },
        });
    },

    updateProduct: (id, data) => {
        return axiosInstance.put(`/api/update-product/${id}`, data, {
            headers: getAuthHeaders(),
        });
    },

    deleteProduct: (id) => {
        return axiosInstance.delete(`/api/delete-product/${id}`, {
            headers: getAuthHeaders(),
        });
    },
    getHomePageData: () => {
        return axiosInstance.get('/api/viewHomePage', {
            headers: getAuthHeaders(),
        });
    },
};

export default apiConfig;
