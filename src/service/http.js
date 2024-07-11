import axios from 'axios';
import session from "./session";
import { PUBLIC_URLS } from '../constants/public-endpoint';
import Notify from '../utils/notify';
// import { removeToken, storeToken } from '../features/authInfo'; // Import the removeToken action from your authSlice
//TODO: handle public endpoints, multiple-part request, json request
import store from "../../src/app/store"
import { removeToken } from '../features/authInfo';

/*Setting up interceptors with axios*/
axios.interceptors.request.use(function (config) {

    config.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    if (isRequireToken(config.url)) {
        config.headers["Authorization"] = `Bearer ${session.get('token')}`;
    }
    return config;


}, function (error) {
    return Promise.reject(error);
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {

    // Do something with response data 
    // 200 OR 20*
    // SUCESS: if request by PUT/POST/DELETE
    // SUCESS: and GET request : no notification
    // ERROR: always

    return response;



}, function (error) {
    if (!error.response && error.message === 'Network Error') {
        return Promise.reject("Couldn't connect to server. Please try again later.");
    } else if (error.response && error.response.status === 401) {
        // store.dispatch(logout())
        store.dispatch(removeToken());
    } else if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    } else {
        return Promise.reject("Server Connection Failed");
    }
});


export default class HTTP {
    static Request(method, url, data = null) {

        return new Promise((resolve, reject) => {
            const request = {
                method,
                url,
                [method.toUpperCase() === 'GET' ? "params" : "data"]: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            axios(request)
                .then(response => resolve(response))
                .catch(error => {
                    if (error.message) {
                        Notify.error(error.message);
                    }
                    reject(error)
                }
                );
        });
    }
}

function isRequireToken(url) {
    const match = PUBLIC_URLS.filter(u => url.endsWith(u));
    return match.length === 0;
}