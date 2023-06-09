import { async } from 'q';
import {createContext, useState } from 'react';
import * as jwt from 'jsonwebtoken';
const defaultAuthContext ={
    isAuthenticated: false,
    currentMember:null,
    register: null,
    login: null,
    logout: null,
};

const AuthContext = createContext (defaultAuthContext);
const AuthProvider =({children}) => {
    const [isAuthenticated, setIsAuthenticated ] =useState(false);
    const [payload, setPayload] =useState(null);
    return(
        <AuthContext.Provider>
            value = {{
                
            }}

  /*              isAuthenticated,
                currentMember:payload,
                    id:payload.sub,
                    name:payload.name,
                register: async(data)=>{
                    const {success, authToken} =await 
                    register ({
                        account: data.account,
                        username: data.username,
                        password: data.password,
                    });
                    const tempPayload = jwt.decode(authToken);
                    if (tempPayload) {
                        setPayload(tempPayload);
                        setIsAuthenticated(true);
                        localStorage.setItem('authToken',authToken);
                    }else{
                        setPayload(null);
                        setIsAuthenticated(false);
                    }
                },
            }}*/
        </AuthContext.Provider>

    );
};