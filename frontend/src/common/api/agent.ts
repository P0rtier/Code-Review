import axios, { AxiosResponse } from "axios";
import { IAuthResponse } from "../interfaces/IAuthResponse";



axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Auth = {
    login: (email: string, password: string) => 
        requests.post<IAuthResponse>('/auth/login', { "email": email, "password": password }),
    register: (email: string, password: string) => 
        requests.post<IAuthResponse>('/auth/register', { "email": email, "password": password }),
    refreshAccess: (refreshToken: string, accessToken: string) => 
        requests.post<IAuthResponse>('/auth/refresh-access', { "refreshToken": refreshToken, "accessToken": accessToken }),
};


const agent = {
    Auth,
};

export default agent;
