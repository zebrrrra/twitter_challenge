//import { async } from 'q';
import { createContext, useState } from 'react';
// import {login}  from '../apis/auth';
import { login, adminLogin } from '../apis/user';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';

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
                    name: payload.name,
                }, responseError, errorInfo, setResponseError,
                /*register: async (data) => {
                    const { success, token } = await register(
                        account: data.account,
                        email: data.email,
                        password: data.password,
                    );
                    const tempPayload = jwt.decode(token);
                    if (tempPayload) {
                        setPayload(tempPayload);
                        setIsAuthenticated(true);
                        localStorage.setItem('token', token);
                    } else {
                        setPayload(null);
                        setIsAuthenticated(false);
                    }
                    return success;
                },*/
                login: async (data) => {
                    const result = await login(
                        {
                            account: data.account,
                            password: data.password,
                        }
                    );
                    //result格式＝{success: false, errInfo: '信箱或是密碼錯誤！'}
                    console.log()
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
                }, adminLogin: async (data) => {
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
                        setResponseError(true)
                        setErrorInfo(errorInfo)
                        setPayload(null);
                        setIsAuthenticated(false);

                    }
                    return result.status === 'success';
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;