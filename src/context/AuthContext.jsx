//import { async } from 'q';
import { createContext, useState } from 'react';
// import {login}  from '../apis/auth';
import { login, adminLogin } from '../apis/user';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { register, putUserSetting } from '../apis/user';

const defaultAuthContext = {
    isAuthenticated: false,

    user: null,
    register: null,
    login: null,
    logout: null,
    responseError: false,
    errorInfo: ''
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [payload, setPayload] = useState(null);

    // 表單錯誤小字errorInfo、responseError狀態
    const [responseError, setResponseError] = useState(false)
    // 有非同步問題待刪除
    const [errorInfo, setErrorInfo] = useState('')
    const { pathname } = useLocation();
    useEffect(() => {
        const checkTokenIsValid = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                setPayload(null);
                return;
            } else {
                const tempPayload = jwt.decode(token);
                setPayload(tempPayload);
                setIsAuthenticated(true);
            }
        };
        checkTokenIsValid();
    }, [pathname]);

    return (

        <AuthContext.Provider
            value={{
                isAuthenticated,
                user: payload && {
                    id: payload.id,
                    role: payload.role,
                    name: payload.name,
                    avatar: payload.avatar,
                    cover: payload.cover,
                },
                register: async (data) => {
                    const { success, token } = await register(
                }, responseError, errorInfo, setResponseError, setErrorInfo
                , register: async (data) => {
                    const result = await register({

        <AuthContext.Provider value={{
            isAuthenticated,
            user: payload && {
                id: payload.id,
                name: payload.name,
                avatar: payload.avatar,
                account: payload.account
            }, responseError, errorInfo, setResponseError, setErrorInfo
            , register: async (data) => {
                const result = await register({
                    account: data.account,
                    name: data.name,
                    password: data.password,
                    email: data.email,
                    checkPassword: data.checkPassword

                });
                console.log(result)//{success: false, errorInfo: '密碼不相同!'}

                if (result.status === 'success') {

                    console.log(result.message)
                    setResponseError(false)
                    // return result
                } else {
                    console.log(result.errorInfo)
                    setResponseError(true)
                    setErrorInfo(result.errorInfo)
                    // return result.errorInfo
                }
                return result.status === 'success'

            }
            , login: async (data) => {
                const result = await login(
                    {

                        account: data.account,
                        password: data.password,
                    }
                );
                //result格式＝{success: false, errInfo: '信箱或是密碼錯誤！'}
                if (result.status === 'success') {
                    const { token } = result.data;
                    const tempPayload = jwt.decode(token);
                    setPayload(tempPayload);
                    console.log(payload)//在登入成功時，payload為null，因此使用useEffect()
                    setIsAuthenticated(true);
                    localStorage.setItem('token', token);
                    setResponseError(false)
                } else {
                    const errorInfo = result.errInfo
                    console.log(errorInfo)

                    setResponseError(true)
                    setErrorInfo(errorInfo)

                    setPayload(null);
                    setIsAuthenticated(false);

                }
                return result.status === 'success';

            },
            logout: () => {
                localStorage.removeItem('token');
                setPayload(null);
                setIsAuthenticated(false);
            },

            adminLogin: async (data) => {
                const result = await adminLogin(
                    {
                        account: data.account,
                        password: data.password,
                    }
                );
                console.log(result)
                if (result.status === 'success') {
                    const { token } = result.data;
                    const tempPayload = jwt.decode(token);
                    setPayload(tempPayload);
                    console.log(payload)//在登入成功時，payload為null，因此使用useEffect()
                    setIsAuthenticated(true);
                    localStorage.setItem('token', token);
                    setResponseError(false)
                } else {
                    const errorInfo = result.errInfo
                    console.log(errorInfo)
                    setResponseError(true)
                    setErrorInfo(errorInfo)
                    setPayload(null);
                    setIsAuthenticated(false);

                }
                console.log(errorInfo)
                return result.status === 'success';

            }, putUserSetting: async (data) => {
                const result = await putUserSetting({
                    id: data.id,
                    account: data.account,
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    checkPassword: data.checkPassword

                });
                console.log(result)//當錯時=err.response，
                if (result.data.status === 'success') {

                    console.log(result.data.message)
                    setResponseError(false)
                    // return result
                } else {
                    console.log(result.data.message)

                    setResponseError(true)
                    setErrorInfo(result.data.message)
                    // return result.errorInfo
                }
                return result.data.status === 'success'
            }

        }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;


// const tempPayload = jwt.decode(token);
                    // if (tempPayload) {
                    //     setPayload(tempPayload);
                    //     setIsAuthenticated(true);
                    //     localStorage.setItem('token', token);
                    // } else {
                    //     setPayload(null);
                    //     setIsAuthenticated(false);
                    // }
                    // console.log(success)
                    // return success

