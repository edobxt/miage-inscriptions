import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();

export const fetchWrapper = { get, post, put, delete: _delete };

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

const authHeader = (url) => {

}

const handleResponse = (response) => {

}