import axios from "axios";
import Vue from 'vue'
import vueAxios from 'vue-axios'

var instance = axios.create({
    baseURL: process.env.NODE_ENV == "development" ? "" : "",
    withCredentials: process.env.NODE_ENV == "development" ? true : false,
    method: "get",
    responseType: "json",
    timeout: 10000,
    headers: {}
});

instance.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";

instance.interceptors.response.use(
    function(res) {
        if (res.data && res.data.error_code == 0) {
            return Promise.resolve(res.data);
        } else {
            return Promise.reject({
                code: ((res.data && res.data.error_code) ? res.data.error_code : -2),
                message:
                (res.data && res.data.error) ||
                res.config.url.replace(res.config.baseURL, "") +
                "<br />Serve Response Error！(*^▽^*)"
            });
        }
    },
    function(error) {
        if (error.message.indexOf("timeout of") === 0) {
            return Promise.reject({
                message: "业务繁忙，请稍后重试",
                code: -1
            });
        }

        return Promise.reject({
            message: error.message,
            code: error.code
        });
    }
);
export default instance;
Vue.use(vueAxios, instance);