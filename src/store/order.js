import axiosInstance from '../axiosInstance';
import Cookies from 'js-cookie';

const apiConfigOrders = {

    orderAdmin: () => {
        return axiosInstance.get('/api/admin/orders', {
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

export default apiConfigOrders;
