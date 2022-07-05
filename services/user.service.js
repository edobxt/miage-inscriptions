import {BehaviorSubject} from "rxjs";
import getConfig from "next/config";
import Router from "next/router";
import {fetchWrapper} from "helpers";

const {publicRuntimeConfig} = getConfig();
const baseUrl = publicRuntimeConfig.apiUrl;

const userSubject = typeof window !== 'undefined'
    ? new BehaviorSubject(JSON.parse(localStorage.getItem('miage_user')))
    : null;

const login = (email, password, target) => {
    return fetchWrapper.post(`${baseUrl}/${target}/authenticate`, {
        email, password
    }).then(user => {
        userSubject.next(user);
        localStorage.setItem('miage_user', JSON.stringify(user));

        return user;
    })
}

const signup = (fullName, email, password, verifyPassword, target) => {
    return fetchWrapper.post(`${baseUrl}/${target}/signup`, {
        fullName, email, password, verifyPassword
    }).then(user => {
        userSubject.next(user);
        localStorage.setItem('miage_user', JSON.stringify(user));

        return user;
    })
}

const logout = () => {
    localStorage.removeItem('miage_user');
    userSubject.next(null);
    Router.push('/login');
}

export const userService = typeof window !== 'undefined'
    ? {
        user: userSubject.asObservable(),
        get userValue () { return userSubject.value },
        login, logout, signup
    }
    : {
        login,
        logout,
        signup
    }
