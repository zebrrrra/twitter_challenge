import React, { createContext, useContext, useState } from 'react';
import { getUsers, getUserFollowings, getUserFollowers } from'../apis/user';
import { postFollowShips,deleteFollowShips } from '../apis/followship';


export const UserContext = createContext();

export const useUser= ()=> useContext(UserContext);

export const UserProvider = (props) => { //抽出來傳遞props
    const [user, setUser] = useState(null);
    const [followings, setFollowings] = useState([]);
    const [followers, setFollowers] = useState([]);

    const fetchUser = async (id) => {
        const data = await getUsers(id);
        setUser(data);
    };

    const fetchFollowings = async (id) => {
        const data = await getUserFollowings(id);
        setFollowings(data);
    };

    const fetchFollowers = async (id) => {
        const data = await getUserFollowers(id);
        setFollowers(data);
    };

    const followUser = async (id) => {
        const data = await postFollowShips(id);
        if (data.status === 'success') {

            fetchFollowings(user.id);
        }
    };

    const unfollowUser = async (followingId) => {
        const data = await deleteFollowShips(followingId);
        if (data.status === 'success') {

            fetchFollowings(user.id);
        }
    };

    return (
        <UserContext.Provider
            value={{
                user,
                followings,
                followers,
                fetchUser,
                fetchFollowings,
                fetchFollowers,
                followUser,
                unfollowUser,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};