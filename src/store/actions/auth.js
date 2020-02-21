import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password,
            returnSecureToken: true
        };

        let url;
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHuQ6wNS11YWBetbLxg3UCAErTW29TThM';
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHuQ6wNS11YWBetbLxg3UCAErTW29TThM';
        }

        const response = await axios.post(url, authData);
        const data = response.data;
        const expirationData = new Date(new Date().getTime() + data.expiresIn * 1000); //время сессии

        localStorage.setItem('token', data.idToken); //для поддерживания сессии пользователя
        localStorage.setItem('userID', data.localId);
        localStorage.setItem('expirationData', expirationData);

        dispatch(authSuccess(data.idToken));
        dispatch(autoLogout(data.expiresIn));

    };
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000);
    };
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('expirationData');
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationData'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}

export function authSuccess(idToken) {
    return {
        type: AUTH_SUCCESS,
        idToken
    }
}