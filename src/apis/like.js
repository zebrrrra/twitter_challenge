import { instance } from './instance';

// POST/api/tweets/:tweedId/like 使用者喜歡一則推文
export const postLike = async (tweetId) => {
  try {
    const response = await instance.post(`/tweets/${tweetId}/like`);
    return response
  } catch (error) {
    console.error('Error:cannot post like', error);
    return null;
  }
};

//POST /api/tweets/:tweedId/unlike 使用者取消喜歡推文
export const postUnLike = async (tweetId) => {
  try {
    const response = await instance.post(`/tweets/${tweetId}/unlike`);
    return response
  } catch (error) {
    console.error('Error:cannot post unlike', error);
    return null;
  }
};