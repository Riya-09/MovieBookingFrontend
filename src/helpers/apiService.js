import axios from 'axios';
import {urls} from "../config/env-config";
import {authHeader, isLoggedIn} from "./authService";

const promiseWithErrorHandling = (promise) => {
    return promise.catch(err => {
        if (err.response && err.response.status === 500) {
            // noinspection JSCheckFunctionSignatures
            window.location.assign("/error");
        } else {
            throw err;
        }
    });
};

export default {
    post: async (path, payload) => {
        return promiseWithErrorHandling(axios.post(`${urls.service}/${path}`, payload, authHeader()));
    },

    get: async (path) => {
        return promiseWithErrorHandling(axios.get(`${urls.service}/${path}`,authHeader()));
    },

    getWithouterrorHandling: async(path) => {
        if(isLoggedIn()){
            return promiseWithErrorHandling(axios.get(`${urls.service}/${path}`,authHeader()));
        }else{
            return (axios.get(`${urls.service}/${path}`));
        }
    },

    postWithoutErrorHandling: async (path, payload) => {
        return axios.post(`${urls.service}/${path}`, payload, authHeader())
    },

    putWithErrorHandling: async (path, payload) => {
        return axios.put(`${urls.service}/${path}`, payload, authHeader())
    }
};
