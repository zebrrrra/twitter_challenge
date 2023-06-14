//import { async } from 'q';
import {createContext, useState } from 'react';
import {login}  from '../apis/auth';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';
import { useContext,useEffect } from 'react';

const defaultAuthContext ={ 
    isAuthenticated: false,
    user:null,
    role:null,
    register: null,
    login: null,
    logout: null,
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
                    const result  = await login(
                        {account:data.account,
                          password:data.password,  
                        }
                    );
                    if(result.status ==='success'){
                        const{token} =result.data;
                    const tempPayload = jwt.decode(token);
                        setPayload(tempPayload);
                        setIsAuthenticated(true);
                        localStorage.setItem('token',token);
                        } else {
                        setPayload(null);
                        setIsAuthenticated(false);
                    }
                    return result.status==='success';

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
