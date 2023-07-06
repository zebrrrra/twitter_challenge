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
        <AuthContext.Provider value={{
            isAuthenticated,
            user: payload && {
                id: payload.id,
                name: payload.name,
                role: payload.role,
                avatar: payload.avatar,
                account: payload.account,
                introduction: payload.introduction,
                email: payload.email,
                cover: payload.cover
            }, payload, setPayload
            , register: async (data) => {
                const result = await register({
                    account: data.account,
                    name: data.name,
                    password: data.password,
                    email: data.email,
                    checkPassword: data.checkPassword

                });
                if (result.status === 'success') {
                    return { success: true, message: result.message }
                } else {
                    return { success: false, message: result.message }
                }
            }
            , login: async (data) => {
                const result = await login(
                    {
                        account: data.account,
                        password: data.password,
                    }
                );
                if (result.status === 'success') {
                    const { token } = result.data;
                    const tempPayload = jwt.decode(token);
                    setPayload(tempPayload);
                    setIsAuthenticated(true);
                    localStorage.setItem('token', token);
                    return {
                        success: true, message: result.message, role: result.data.user.role
                    }
                } else {
                    setPayload(null);
                    setIsAuthenticated(false);
                    return {
                        success: false, message: result.message
                    }
                }
            },
            logout: () => {
                localStorage.removeItem('token');
                localStorage.removeItem('avatar');
                setPayload(null);
                setIsAuthenticated(false);
            },

            adminLogin: async (data) => {
                const result = await adminLogin(
                    {
                        account: data.account,
                        password: data.password,
                    })
                if (result.status === 'success') {
                    const { token } = result.data;
                    const tempPayload = jwt.decode(token);
                    setPayload(tempPayload);
                    setIsAuthenticated(true);
                    localStorage.setItem('token', token);
                    return {
                        success: true, message: result.message, role: result.data.user.role
                    }
                } else {
                    setPayload(null);
                    setIsAuthenticated(false);
                    return {
                        success: false, message: result.message
                    }
                }

            }, putUserSetting: async (data) => {
                const result = await putUserSetting({
                    id: data.id,
                    account: data.account,
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    checkPassword: data.checkPassword

                });
                if (result.status === 'success') {
                    return { success: true, message: result.message }
                } else {
                    return { success: false, message: result.message }
                }
            }

        }}>
            {children}
        </AuthContext.Provider >
    )
};

export default AuthContext;
