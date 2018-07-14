import axios from "axios"

axios.defaults.baseURL = "http://vivo-dev.yjihua.cn:8080";
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么，添加 userSessionId
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
}, function (error) {
    return Promise.reject(errMsg);
});
export default axios;
