import axios from 'axios';

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, body, header, params) => {
    return axiosInstance({
        method,
        url,
        data: body ? body : null,
        headers: header ? header : null,
        params: params ? params : null,
    });
}