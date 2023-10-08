import axios from 'axios';
export const instance = axios.create({
  baseURL: 'https://twitter-ac-team-d93c31406834.herokuapp.com/api'
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
    return Promise.reject(error);
  }
);