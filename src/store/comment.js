import axiosInstance from '../axiosInstance';
import Cookies from 'js-cookie';

const apiConfigComment = {

    comment: () => {
        return axiosInstance.get('/api/view-comment', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization:
                    Cookies.get('token') != (null || undefined)
                        ? `Bearer ${Cookies.get('token')}`
                        : '',
            },
        });
    },
    addComment: (slug, data) => {
        return axiosInstance.post(`/api/comments/${slug}`, data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization:
                    Cookies.get('token') != (null || undefined)
                        ? `Bearer ${Cookies.get('token')}`
                        : '',
            },
        });
    }




};

export default apiConfigComment;
