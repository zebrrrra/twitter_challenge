import React, { createContext, useContext, useState } from 'react';
import { getUsers, getUserFollowings, getUserFollowers } from'../apis/user';
import { getTopFollowers} from '../apis/user';
import { postFollowShips,deleteFollowShips } from '../apis/followship';


export const id =''
export const UserContext = createContext(id);

export const useUser= ()=> useContext(UserContext);

export const UserProvider = ({children}) => { 
    const [users, setUsers] = useState([]);


    const fetchUser = async (id) => {
        const data = await getUsers(id);
        setUsers(data);
    };

    const fetchFollowings = async (id) => {
        const data = await getUserFollowings(id);
        setUsers(data);  
      }
    
      const fetchFollowers = async (id) => {
        const data = await getUserFollowers(id);
        setUsers(data);  
      }
    
      const fetchTopFollowers = async () => {
        const data = await getTopFollowers();
        setUsers(data);  
      }

    return (
        <UserContext.Provider
            value={{
                users,
                fetchUser,
                fetchFollowings,
                fetchFollowers,
                fetchTopFollowers
            }}
        >
            {children}
        </UserContext.Provider>
    );
};