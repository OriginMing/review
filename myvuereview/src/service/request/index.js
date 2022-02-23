import axios from 'axios';
import { Loading } from 'element-ui';
const DEAFULT_LOADING = true
class Request {
    constructor(config) {
        this.instance = axios.create(config);//根据config创建axios实例
        this.showLoading = config.showLoading ? config.showLoading : DEAFULT_LOADING;//如果传入Loding配置就用传入的，否则就默认的True;
        this.interceptors = config.interceptors;
        // 从实例config中取出的拦截器是对应的实例的拦截器  
        //对于 某些请求可能需要携带token 那么 new Request({})就可以传入特定的拦截器,统一添加token,封装更加颗粒化
        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptor,
            this.interceptors?.requestInterceptorCatch
        )
        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptor,
            this.interceptors?.responseInterceptorCatch
        )
        // 添加所有的实例都有的拦截器
        this.instance.interceptors.request.use((config) => {
            if (this.showLoading) {
                this.loadingInstance1 = Loading.service({ fullscreen: true, text: '正在请求数据....', });
            }
            return config
        }, (err) => { return err });
        this.instance.interceptors.response.use((res) => {
            this.loadingInstance1?.close()  // ?. 可选链操作符
            let data = res.data;//拿出后端返回的真是data；
            return data
        }, (err) => {
            this.loadingInstance1?.close()
            return err
        })
    }
    request(config) {
        return new Promise((resolve, reject) => {
            // 1.单个请求对请求config的处理
            if (config.interceptors?.requestInterceptor) {
                config = config.interceptors.requestInterceptor(config);
            }
            // 2.判断是否需要显示loading
            if (config.showLoading === false) {
                this.showLoading = config.showLoading
            }
            this.instance.request(config).then((res) => {
                // 单个请求的响应拦截
                if (config.interceptors?.responseInterceptor) {
                    res = config.interceptors.responseInterceptor(res)
                }
                // 将showLoading设置true, 这样不会影响下一个请求
                this.showLoading = DEAFULT_LOADING
                resolve(res)
            }).catch((err) => {
                this.showLoading = DEAFULT_LOADING
                reject(err)
            })
        })
    }
}
export default Request
