import getConfig from 'next/config';
import {studentService} from "services";

const {publicRuntimeConfig} = getConfig();

const authHeader = (url) => {
    const student = studentService.studentValue;
    const isLoggedIn = student && student.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);

    return isLoggedIn && isApiUrl
        ? { Authorization: `Bearer ${student.token}` }
        : {};
}

const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if ([401, 403].includes(response.status) && studentService.studentValue) {
                studentService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

const get = (url) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

const post = (url, body) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url)},
        credentials: 'include',
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

const put =(url, body) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url)},
        body: JSON.stringify(body)
    }
    return fetch(url, requestOptions).then(handleResponse);
}

const _delete = (url) => {
    const requestOptions = {
        methode: 'DELETE',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

export const fetchWrapper = { get, post, put, delete: _delete };