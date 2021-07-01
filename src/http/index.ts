import axios from "axios";

const authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config: any) => {
    config.headers.Authorization = `${localStorage.getItem("token")}`;
    return config;
}

authHost.interceptors.request.use(authInterceptor);

export {
    authHost,
    host
}