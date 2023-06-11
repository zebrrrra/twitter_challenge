import { useEffect, useState } from 'react';
import TweetCard from '../TweetCard/TweetCard';
import { getAllTweets } from '../../apis/tweet';

//import style from '';
//假設有Authcontext(還沒寫)

const AllTweets =({ userId })=>{
    const [allTweets, setAllTweets] = useState([]);

    useEffect(()=>{
        const fetchTweets = async () => {
            const data = await getAllTweets();
            console.log(data); //測試
            if (data) {
                setAllTweets(data);
            }
        }
        fetchTweets();
    }, [ userId]); 

    return allTweets.map(alltweet => {
    if(!alltweet.User){
        return null;
    }
    return<TweetCard key={alltweet.id} tweet={alltweet} type="alltweet"/>});
}

export default AllTweets;