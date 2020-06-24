import axiosClient from './axios';

const tokenAuth = (token) => { 
    if (token) {
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosClient.headers.common['Authorization'];
    }

}

export default tokenAuth;