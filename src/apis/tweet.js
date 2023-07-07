import axios from 'axios';

const baseUrl = 'https://twitter-ac-team-d93c31406834.herokuapp.com/api';


//POST /api/tweets 新增推文

export const postTweets = async (description) => { //新增推文內容
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(`${baseUrl}/tweets`, { description },
      {
        headers: {
          Authorization: `Bearer ${token}`//測試用要刪掉
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error:cannot post tweet', error);
    return null;
  }
};

//GET /api/tweets 取得所有推文，包括推文作者

export const getAllTweets = async () => {

  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${baseUrl}/tweets`, {
      headers: {
        Authorization: `Bearer ${token}`
      }

    });
    return response.data;
  } catch (error) {
    console.error('Error:cannot get all tweets', error);
  }
};

//POST /api/tweets/:tweetId/replies 使用者在推文中新增一條回覆
export const postATweetReply = async ({ tweetId, comment }) => {

  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${baseUrl}/tweets/${tweetId}/replies`, { comment }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return { success: true, message: response.data.message }
  } catch (error) {
    console.error('Error:cannot get a tweet', error);
    return { success: false, message: error.response.data.message }
  }
};
//GET /api/tweets/:tweetId/replies 瀏覽推文下所有回覆
export const getATweetReply = async (tweetId) => {

  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${baseUrl}/tweets/${tweetId}/replies`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error:cannot get a tweet', error);
  }
};

//GET /api/tweets/:tweetId 取得一筆推文
export const getATweet = async (tweetId) => {

  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${baseUrl}/tweets/${tweetId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error:cannot get a tweet', error);
  }
};

