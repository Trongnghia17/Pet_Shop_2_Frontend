import axiosInstance from '../axiosInstance';
import Cookies from 'js-cookie';

const apiConfig = {
    checkout: (data) => {
        return axiosInstance.post('/api/place-order', data, {
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

export default apiConfig;
