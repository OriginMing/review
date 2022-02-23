import { BASE_URL,timeout } from "./request/config.js";
import Request from "./request/index.js";
import LocalCache from "../utils/LocalCache.js";
const wmRequest = new Request({
    baseURL:BASE_URL,
    timeout,
    interceptors: {
        requestInterceptor: (config) => {
          // 携带token的拦截
          const token = LocalCache.getCache('token')
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
          return config
        },
        requestInterceptorCatch: (err) => {
          return err
        },
        responseInterceptor: (res) => {
          return res
        },
        responseInterceptorCatch: (err) => {
          return err
        }
      }
})

export default wmRequest