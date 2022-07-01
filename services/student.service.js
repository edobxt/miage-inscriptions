import {BehaviorSubject} from "rxjs";
import getConfig from "next/config";
import Router from 'next/router'

import {fetchWrapper} from "helpers";
import {retry} from "rxjs/src/internal/operators/retry";

const {publicRuntimeConfig} = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/students`;
const studentSubject = new BehaviorSubject(typeof window && JSON.parse(localStorage.getItem('student')));

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

export const studentService = {
    student: studentSubject.asObservable(),
    get studentValue () { return studentSubject.value },
    login,
    logout,
    getAll
};