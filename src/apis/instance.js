import axios from 'axios';
export const instance = axios.create({
  baseURL: 'https://twitter-ac-team-d93c31406834.herokuapp.com/api',
  timeout: 5000,
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    if (error.response) {
      return error.response.data
    }
    if (!window.navigator.onLine) {
      alert("網路出了點問題，請重新連線後重整網頁");
      return;
    }
    return Promise.reject(error);
  }
);