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
    console.log(`${baseUrl}/${target}/authenticate`)
    return fetchWrapper.post(`${baseUrl}/${target}/authenticate`, {
        email, password
    }).then(user => {
        console.log("test")
        userSubject.next(user);
        localStorage.setItem('miage_user', JSON.stringify(user));

        return user;
    })
}

const logout = () => {
    localStorage.removeItem('miage_user');
    userSubject.next(null);
    console.log("logout")
    Router.push('/login');
}

export const userService = typeof window !== 'undefined'
    ? {
        user: userSubject.asObservable(),
        get userValue () { return userSubject.value },
        login, logout
    }
    : {
        login,
        logout
    }
