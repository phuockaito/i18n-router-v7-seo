import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import queryString from "query-string";

export const axiosClient = axios.create({
    baseURL: typeof window !== "undefined" ? "/api" : import.meta.env.VITE_APP_URL_API || "",
    headers: {
        "content-type": "application/json",
    },
    responseType: "json",
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        return config;
    },
    function error(err) {
        return Promise.reject(err);
    },
);

axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    async (error: AxiosError) => {
        return Promise.reject(error?.response?.data || error);
    },
);
