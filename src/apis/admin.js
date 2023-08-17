import axios from 'axios';
import { instance } from './instance';
const baseUrl = 'https://twitter-ac-team-d93c31406834.herokuapp.com/api';

//POST /api/admin/login 管理者登入
export const adminLogin = async ({ account, password }) => {
  try {
    const response = await axios.post(`${baseUrl}/admin/login`, { account, password })
    return response.data
  } catch (err) {
    return err.response.data
  }
}

//GET /api/admin/users 管理者可以看見所有的使用者 (包括 admin)
export const getAdminUsers = async ({ signal }) => {
  try {
    const response = await instance.get(`/admin/usersdata`, { signal });
    return response
  } catch (error) {
    throw error
  }
};

//GET /api/admin/tweets 管理者可以看見所有推文
export const getAdminAllTweets = async ({ signal }) => {
  try {
    const response = await instance.get(`/admin/tweets`, { signal });
    return response
  } catch (error) {
    throw error
  }
};

//DELETE /api/admin/tweets/:id 管理者可以刪除使用者的推文
export const deleteAdminUserTweets = async (id) => {
  try {
    const response = await instance.delete(`/admin/tweets/${id}`);
    return response
  } catch (error) {
    throw error
  }
};
