import axiosInstance from '../axiosInstance';
import Cookies from 'js-cookie';

const apiConfigHome = {
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
    detailProduct: (category_slug,product_slug, data) => {
        return axiosInstance.get(`/api/viewproductdetail/${category_slug}/${product_slug}`, data, {
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

export default apiConfigHome;
