import { useEffect, useState } from 'react';
import TweetCard from '../TweetCard/TweetCard';
import { getAllTweets } from '../../apis/tweet';
import { deleteAdminUserTweets } from '../../apis/admin';


const AdminAllTweets =({ userId })=>{
    const [allUserTweets, setAllUserTweets] = useState([]);

    useEffect(()=>{
        const fetchTweets = async () => {
            const data = await getAllTweets();
            console.log(data); //測試
            if (data) {
                setAllUserTweets(data);
            }
        }
        fetchTweets();
    }, [ userId]); 

    return allUserTweets.map(allUsertweet => {
    if(!allUsertweet.User){
        return null;
    }
    return<TweetCard key={allUsertweet.id} tweet={allUsertweet} type="alltweet"/>});
}

export default AdminAllTweets;