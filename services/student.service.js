import {BehaviorSubject} from "rxjs";
import getConfig from "next/config";
import Router from 'next/router'

import {fetchWrapper} from "helpers";

const {publicRuntimeConfig} = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/students`;

const studentSubject = typeof window !== 'undefined'
    ? new BehaviorSubject(JSON.parse(localStorage.getItem('student')))
    : null;

const login = (email, password) => {
    return fetchWrapper.post(`${baseUrl}/authenticate`, {
        email,
        password
    }).then(student => {
        studentSubject.next(student);
        localStorage.setItem('student', JSON.stringify(student));

        return student;
    })
}

const logout = () => {
    localStorage.removeItem('student');
    studentSubject.next(null);
    Router.push('/login');
}

const getAll = () => {
    return fetchWrapper.get(baseUrl);
}

export const studentService = typeof window !== 'undefined'
    ? {
        student: studentSubject.asObservable(),
        get studentValue () { return studentSubject.value },
        login,
        logout,
        getAll
    }
    : {
        login,
        logout,
        getAll
    }