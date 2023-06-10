import { async } from 'q';
import {createContext, useState } from 'react';
import { login, register } from '../apis/auth';
import * as jwt from 'jsonwebtoken';

const defaultAuthContext ={ 
    isAuthenticated: false,
    currentMember:null,
    register: null,
    login: null,
    logout: null,
};

const AuthContext = createContext (defaultAuthContext);
export const AuthProvider =({children}) => {
    const [isAuthenticated, setIsAuthenticated ] =useState(false);
    const [payload, setPayload] =useState(null);
    return(
        <AuthContext.Provider
            value = {{
                 isAuthenticated,
                 currentMember:payload && {
                    id:payload.sub,
                name: payload.name,
            },
            
                /*register: async(data)=>{
                    const {success, token} =await register ({
                        account: data.account,
                        username: data.username,
                        email: data.email,
                        password: data.password,
                    });
                    const tempPayload = jwt.decode(token);
                    if (tempPayload) {
                        setPayload(tempPayload);
                        setIsAuthenticated(true);
                        localStorage.setItem('token',token);
                    }else{
                        setPayload(null);
                        setIsAuthenticated(false);
                    }
                    return success;
                },*/
                login :async (data) => {
                    const {success, token} =await login({
                        account: data.account,
                        password: data.password,
                    });
                    const tempPayload = jwt.decode(token);
                    if (tempPayload){
                        setPayload(tempPayload);
                        setIsAuthenticated(true);
                        localStorage.setItem('token',token);
                    } else {
                        setPayload(null);
                        setIsAuthenticated(false);
                    }
                    return success;
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