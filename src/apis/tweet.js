import axios from 'axios';

const baseUrl ='https://tranquil-basin-75437.herokuapp.com/api';


//POST /api/tweets 新增推文
export const postTweets= async (id)=>{
const token = localStorage.getItem('token');
try{
    const response = await axios.get (`${baseUrl}/tweets`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
} catch (error){
    console.error ('Error:cannot post tweet',error)
}
};

//GET /api/tweets 取得所有推文，包括推文作者
//GET /api/tweets/:tweetId 取得一筆推文
//POST /api/tweets/:tweetId/replies 使用者在推文中新增一條回覆
//GET /api/tweets/:tweetId/replies 瀏覽推文下所有回覆