//import { async } from 'q';
import { createContext, useState } from 'react';
import { adminLogin } from '../apis/user';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
//socket
import { socket } from '../apis/socket';

const defaultAuthContext = {
    isAuthenticated: false,
    user: null,
    register: null,
    logout: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [payload, setPayload] = useState(null);
    const { pathname } = useLocation();

    useEffect(() => {
        const handleConnectSocket = () => {
            socket.emit('client-join', payload?.id)
        }

        const checkTokenIsValid = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                setPayload(null);
                socket.emit('client-leave', () => {
                    socket.disconnect();
                });
                return;

            } else {
                const tempPayload = jwt.decode(token);
                setPayload(tempPayload);
                setIsAuthenticated(true);
                socket.connect();
                socket.on('connect', handleConnectSocket)
            }
        };
        checkTokenIsValid();
        return () => {
            console.log('bye')
            socket.off('connect', handleConnectSocket)
        }
    }, [pathname, socket?.connected]);



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
            }, payload, setPayload, setIsAuthenticated
            , logout: () => {

                //socket登出
                if (socket) {
                    socket.emit('client-leave', () => {
                        socket.disconnect();
                    });
                    socket.off();
                    localStorage.removeItem('token');
                    localStorage.removeItem('avatar');
                    localStorage.removeItem('usersUpdate');
                    setPayload(null);
                    setIsAuthenticated(false);
                }
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

            }
        }}>
            {children}
        </AuthContext.Provider >
    )
};

export default AuthContext;