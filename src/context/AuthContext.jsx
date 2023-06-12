//import { async } from 'q';
import { createContext, useState } from 'react';
// import {login}  from '../apis/auth';
import { login } from '../apis/user';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';

const defaultAuthContext = {
    isAuthenticated: false,
    user: null,
    register: null,
    login: null,
    logout: null,
    error: false,
    message: ''
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [payload, setPayload] = useState(null);

    // 表單錯誤小字message、error狀態
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

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
                }, error, message,
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

                    if (result.status === 'success') {
                        const { token } = result.data;
                        const tempPayload = jwt.decode(token);
                        setPayload(tempPayload);
                        console.log(payload)//在登入成功時，payload為null，因此使用useEffect()
                        setIsAuthenticated(true);
                        localStorage.setItem('token', token);
                        setError(false)
                    } else {
                        const errInfo = result.errInfo
                        setError(true)
                        setMessage(errInfo)
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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
// { id: 194, email: 'za@za.com', name: 'za', avatar: 'https://i.imgur.com/PiJ0HXw.png', introduction: null, … }
// account
// :
// "za"
// avatar
// :
// "https://i.imgur.com/PiJ0HXw.png"
// cover
// :
// "https://i.imgur.com/Enl7tJ1.jpg"
// createdAt
// :
// "2023-06-11T23:07:44.000Z"
// email
// :
// "za@za.com"
// id
// :
// 194
// introduction
// :
// null
// name
// :
// "za"
// role
// :
// "user"
// updatedAt
// :
// "2023-06-11T23:07:44.000Z"