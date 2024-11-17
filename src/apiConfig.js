import axiosInstance from './axiosInstance';

const apiConfig = {
    login: (data) => axiosInstance.post('/api/login', data),
    register: (data) => axiosInstance.post('/api/register', data),
};

export default apiConfig;
