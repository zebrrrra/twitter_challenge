import { instance } from './instance';

//POST /api/tweets 新增推文
export const postTweets = async (description) => { //新增推文內容
  try {
    const response = await instance.post(`/tweets`, { description });
    return response
  } catch (error) {
    throw error
  }
};

//GET /api/tweets 取得所有推文，包括推文作者
export const getAllTweets = async ({ signal }) => {
  try {
    const response = await instance.get(`/tweets`, { signal });
    return response
  } catch (error) {
    throw error;
  }
};

//POST /api/tweets/:tweetId/replies 使用者在推文中新增一條回覆
export const postATweetReply = async ({ id, comment }) => {
  try {
    const response = await instance.post(`/tweets/${id}/replies`, { comment });
    return response
  } catch (error) {
    throw error
  }
};

//GET /api/tweets/:tweetId/replies 瀏覽推文下所有回覆
export const getATweetReply = async ({ id, signal }) => {
  try {
    const response = await instance.get(`/tweets/${id}/replies`, { signal });
    return response
  } catch (error) {
    throw error
  }
};

//GET /api/tweets/:tweetId 取得一筆推文
export const getATweet = async ({ id, signal }) => {
  try {
    const config = signal ? { signal } : {};
    const response = await instance.get(`/tweets/${id}`, config);
    return response
  } catch (error) {
    throw error
  }
};