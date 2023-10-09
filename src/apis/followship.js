import { instance } from './instance';

//POST /api/followships 追蹤使用者
export const postFollowShips = async (id) => {
  try {
    const response = await instance.post(`/followships`, { id });
    return response
  } catch (error) {
    console.error('Error:cannot post follow', error);
    return null;
  }
};

//DELETE /api/followships/:followingId 刪除追蹤使用者
export const deleteFollowShips = async (followingId) => {
  try {
    const response = await instance.delete(`/followships/${followingId}`);
    return response
  } catch (error) {
    console.error('Error:cannot unfollow', error);
    return null;
  }
};