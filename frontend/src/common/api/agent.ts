import axios, { AxiosError, AxiosResponse } from "axios";
import { IAuthResponse } from "../interfaces/IAuthResponse";
import { IUser } from "../interfaces/IUser";
import { toast } from "react-toastify";
import { IErrorData } from "../utils/IErrorData";
import { StatusCodes } from "../enums/StatusCodes";
import { CSSProperties } from "react";
import { router } from "../../pages/app/App";


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.request.use((config) => {
    const user = localStorage.getItem('user');

    if (user) {
        const parsedUser: IUser = JSON.parse(user);
        config.headers.Authorization = `Bearer ${parsedUser.accessToken}`;
    }

    return config;
});

axios.interceptors.response.use(response => response, (error: AxiosError) => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running!');
    }

    if (!error.response) {
        return Promise.reject(error);
    }

    const { data , status } = error.response;

    switch (status) {
        case StatusCodes.BadRequest:
            const parsedData = data as IErrorData;
            const toastStyle: CSSProperties = { whiteSpace: 'pre-line' };
            toast.error(`${parsedData.title}\n${parsedData.detail}`, { style: toastStyle });
            break;

        case StatusCodes.Unauthorized:
            return refreshToken(error);

        case StatusCodes.InternalServerError:
            router.navigate('/server-error');
            break;
            
        default:
            break;
    }

    return Promise.reject(error);
});

const refreshToken = async (error: AxiosError) => {
    const user = localStorage.getItem('user');

    if (!user) {
        router.navigate('/login');
        return Promise.reject(error);
    }

    if (error.config) {
        const parsedUser: IUser = JSON.parse(user);
        try {
            const response = await agent.Auth.refreshAccess(parsedUser.refreshToken, parsedUser.accessToken);
            const { accessToken, refreshToken } = response;
            localStorage.setItem('user', JSON.stringify({ ...parsedUser, accessToken, refreshToken }));
            error.config.headers.Authorization = `Bearer ${accessToken}`;
            return axios.request(error.config);
        } catch (error) {
            localStorage.removeItem('user');
            router.navigate('/login');
            return Promise.reject(error);
        }
    }
    
    localStorage.removeItem('user');
    router.navigate('/login');
    return Promise.reject(error);
}

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

const Notifications = {
    getAll: () => requests.get('/notifications'),
};


const agent = {
    Auth,
    Notifications,
};

export default agent;
