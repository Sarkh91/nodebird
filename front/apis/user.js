import axios from 'axios';

export function loginAPI(data) {
  return axios.post('/user/login', data).then((response) => response.data);
}

export function logoutAPI(data) {
  return axios.post('/user/logout', data).then((response) => response.data);
}

export function loadMyInfoAPI() {
  return axios.get('/user').then((response) => response.data);
}

export function loadUserAPI(id) {
  return axios.get(`/user/${id}`).then((response) => response.data);
}

export function followAPI(data) {
  return axios.post('/user/follow', data).then((response) => response.data);
}

export function unfollowAPI(data) {
  return axios.post('/user/unfollow', data).then((response) => response.data);
}

export function loadFollowersAPI() {
  return axios.get('/user/followers').then((response) => response.data);
}

export function loadFollowingsAPI() {
  return axios.get('/user/followings').then((response) => response.data);
}

export function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`).then((response) => response.data);
}

export function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', data).then((response) => response.data);
}

export function signupAPI(data) {
  return axios.post('/user', data).then((response) => response.data);
}
