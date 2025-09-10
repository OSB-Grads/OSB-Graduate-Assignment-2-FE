import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
})

interface IToken {
    token: string | null,
}

const token: IToken = {
    token: null,
}

export const setToken = function (t: string | null) {
    token.token = t
}

axiosInstance.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem('access_token')
        if(token){
          config.headers.Authorization=`Bearer ${token}`;  
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

export default axiosInstance