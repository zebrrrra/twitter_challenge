import axios from 'axios';

const baseUrl = 'https://twitter-ac-team-d93c31406834.herokuapp.com/api';

// POST/api/tweets/:tweedId/like 使用者喜歡一則推文

export const postLike = async (tweetId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${baseUrl}/tweets/${tweetId}/like`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error:cannot post like', error);
    return null;
  }
};

//POST /api/tweets/:tweedId/unlike 使用者取消喜歡推文
export const postUnLike = async (tweetId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${baseUrl}/tweets/${tweetId}/unlike`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error:cannot post unlike', error);
    return null;
  }
};