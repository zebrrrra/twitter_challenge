import {createContext, useState ,useEffect, useContext } from 'react';
import {getUserLike, postLike, postUnLike} from '../apis/tweet';

const LikeContext =createContext();
export const useLikes =()=>{
    return useContext(LikeContext);
}

export const LikeProvider =({userId, children}) =>{
    const [likes, setLikes] =useState([]);

    useEffect(()=>{

        const fetchLikes = async () =>{
            const data = await getUserLike(userId);
            setLikes(data);
        };
        fetchLikes();
    }, [userId]
    );

    const addLike = async (tweetId) =>{
        await postLike (tweetId);
        setLikes([...likes,tweetId]);
    }
    const removeLike = async (tweetId) =>{
        await postUnLike (tweetId);
        setLikes (likes.filter(id=> id !==tweetId));
    };

    const value ={
        likes,
        addLike,
        removeLike,
    };

    return (
        <LikeContext.Provider value={value}>
          {children}
        </LikeContext.Provider>
      );
    };

