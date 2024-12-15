import axios from 'axios'

const instance = axios.create({
    baseURL: '',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.request.use(
    config => {
        console.log('请求拦截成功', config.url, config.data);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        console.log('拦截请求成功', response);
        return response;
    },
    error => {
        if (error.response) {
            console.error('状态错误', error.response.status);
        } else if (error.request) {
            console.error('没收到响应', error.request);
        } else {
            console.error('信息出错', error.message);
        }
        return Promise.reject(error);
    }
);

export default instance;