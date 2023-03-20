import axios from 'axios'
import router from "@/router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useState } from '@/stores/state'

const request = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 30000,
})

// 处理  类型“AxiosResponse<any, any>”上不存在属性“xxxx”。ts(2339) 关键一步。
declare module "axios" {
    interface AxiosResponse<T = any> {
        total: number
        records: any
        code: any
        msg: string
        // 这里追加你的参数
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}


// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    NProgress.start();
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null
    if (user) {
        config.headers['token'] = user.token;  // 设置请求头
    }
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        const state = useState();
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        // 当权限验证不通过的时候给出提示
        if (res.code === '401') {
            state.remindElMessage(res.msg, 2);
            router.push("/login")
        }
        if (res.code === '404') {
            state.remindElMessage(res.msg, 2);
            router.push("/404")
        }
        if (res.code === '600') {
            state.remindElMessage('用户名或密码错误', 2);
        }
        NProgress.done();
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        NProgress.done();
        return Promise.reject(error)
    }

)

export default request