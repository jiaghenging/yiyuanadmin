import axios from 'axios';

import VueAxios from 'vue-axios'

export function request(config) {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_APP_BASE_API,
        timeout: 10000
    })
    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response;
    }, function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        if(error.response){
            if(error.status==500){
                alert('服务器内部错误')
            }
        }
        return Promise.reject(error);
    });
    // 发送真正的网络请求
    return instance(config);
}