import { useEffect, useState } from 'react';
import { getAdminAllTweets } from '../../apis/admin';
import { deleteAdminUserTweets } from '../../apis/admin';
import AdminTweetCard from '../AdminTweetCard/AdminTweetCard';


const AdminAllTweets =({ userId })=>{
    const [allUserTweets, setAllUserTweets] = useState([]);

    useEffect(()=>{
        const fetchTweets = async () => {
            const data = await getAdminAllTweets();
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
    return<AdminTweetCard key={allUsertweet.id} tweet={allUsertweet} type="alltweet"/>});
}

export default AdminAllTweets;