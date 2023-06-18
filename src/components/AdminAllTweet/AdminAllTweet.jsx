import { useEffect, useState } from 'react';
import { getAdminAllTweets } from '../../apis/admin';
import { deleteAdminUserTweets } from '../../apis/admin';
import AdminTweetCard from '../AdminTweetCard/AdminTweetCard';
import Swal from 'sweetalert2';




const AdminAllTweets =({ userId })=>{
    const [allUserTweets, setAllUserTweets] = useState([]);

    const handleOnDelete = async (id) => {
        Swal.fire({
            title: '你確定要刪除嗎?',
            text: '刪除後不可回復',
            icon: 'warning',
            showCancelButton: true,

        }).then(async (result) => {
            if (result.isConfirmed){
        try {
            const response = await deleteAdminUserTweets(id);
            if (response && response.status === 'success') {
                setAllUserTweets(allUserTweets => allUserTweets.filter((tweet) => tweet.id !== id));
            } else {
                return null;
            }
        } catch (error) {
            console.error("error while deleting tweet: ", error);
            return null;
        }
    }})
    };
        
    

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
    return<AdminTweetCard 
    key={allUsertweet.id} 
    tweet={allUsertweet} 
    handleOnDelete={handleOnDelete} 
    type="alltweet"/>})}
;

export default AdminAllTweets;