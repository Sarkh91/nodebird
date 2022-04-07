import axios from 'axios';

export function loadPostsAPI(data) {
  return axios.get('/posts', data).then((response) => response.data);
}

export function addPostAPI(data) {
  return axios.post('/post', data).then((response) => response.data);
}

export function uploadImagesAPI(data) {
  return axios.post('/post/images', data).then((response) => response.data);
}

export function likePostAPI(id) {
  return axios.patch(`/post/${id}/like `).then((response) => response.data);
}

export function unLikePostAPI(id) {
  return axios.patch(`/post/${id}/unlike`).then((response) => response.data);
}

export function removePostAPI(data) {
  return axios.delete(`/post/${data}`, data).then((response) => response.data);
}

export function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data).then((response) => response.data);
}

export function retweetAPI(data) {
  return axios.post(`/post/${data}/retweet`).then((response) => response.data);
}

export function loadHashtagPostsAPI({ tag, pageCnt = 10, lastId }) {
  return axios.get('/posts/hashtag', { params: { tag, pageCnt, lastId } }).then((response) => response.data);
}

export function loadUserPostsAPI(param) {
  console.log(param);

  return axios.get(`/posts/user/${param.id}`, { params: { pageCnt: param.pageCnt, lastId: param.lastId } }).then((response) => response.data);
}

export function loadPostAPI(id) {
  return axios.get(`/post/${id}`).then((response) => response.data);
}
