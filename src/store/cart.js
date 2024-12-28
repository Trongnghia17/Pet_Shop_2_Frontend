import axiosInstance from '../axiosInstance';
import Cookies from 'js-cookie';

const apiConfigCart = {

    getListCart: () => {
        return axiosInstance.get('/api/cart', {
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
                Authorization:
                    Cookies.get('token') != (null || undefined)
                        ? `Bearer ${Cookies.get('token')}`
                        : '',
            },
        });
    },
    addCart: (data) => {
        return axiosInstance.post('api/add-to-cart', data, {
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
                Authorization:
                    Cookies.get('token') != (null || undefined)
                        ? `Bearer ${Cookies.get('token')}`
                        : '',
            },
        });
    },
    updateCart: (id, data) => {
        return axiosInstance.put(`/api/cart-updateQuantity/${id}`, data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization:
                    Cookies.get('token') != (null || undefined)
                        ? `Bearer ${Cookies.get('token')}`
                        : '',
            },
        });
    },
    deleteCart: (id) => {
        return axiosInstance.delete(`/api/delete-cartItem/${id}`, {
            headers: {
                'Access-Control-Allow-Origin': '*', // Required for CORS support to work
                Authorization:
                    Cookies.get('token') != (null || undefined)
                        ? `Bearer ${Cookies.get('token')}`
                        : '',
            },
        });
    },



};

export default apiConfigCart;
