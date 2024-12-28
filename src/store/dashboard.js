import axiosInstance from '../axiosInstance';
import Cookies from 'js-cookie';

const apiConfigDashBoard = {
    getDashBoard: () => {
        return axiosInstance.get('/api/view-dashboard' ,{
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

export default apiConfigDashBoard;
