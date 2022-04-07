import axios from 'axios';
import { all, delay, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import {
  ADD_COMMENT_REQUEST,
  ADD_POST_REQUEST,
  addCommentFailureAction,
  addCommentSuccessAction,
  addPostFailureAction,
  addPostSuccessAction,
  LIKE_POST_REQUEST,
  likePostFailureAction,
  likePostSuccessAction,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_POST_REQUEST,
  LOAD_POSTS_REQUEST,
  LOAD_USER_POSTS_REQUEST,
  loadHashtagPostsFailureAction,
  loadHashtagPostsSuccessAction,
  loadPostFailureAction,
  loadPostsFailureAction,
  loadPostsSuccessAction,
  loadPostSuccessAction,
  loadUserPostsFailureAction,
  loadUserPostsSuccessAction,
  REMOVE_POST_REQUEST,
  removePostFailureAction,
  removePostSuccessAction,
  RETWEET_REQUEST,
  retweetFailureAction,
  retweetSuccessAction,
  UNLIKE_POST_REQUEST,
  unLikePostFailureAction,
  unLikePostSuccessAction,
  UPLOAD_IMAGES_REQUEST,
  uploadImagesFailureAction,
  uploadImagesSuccessAction,
} from '../reducers/post';
import { addPostToMe, removePostOfMe } from '../reducers/user';

function loadPostsAPI(data) {
  return axios.get('/posts', data);
}

function loadPostAPI(id) {
  return axios.get(`/post/${id}`);
}

function addPostAPI(data) {
  return axios.post('/post', data);
}

function removePostAPI(data) {
  return axios.delete(`/post/${data}`, data);
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* loadPosts({ payload }) {
  try {
    const result = yield call(loadPostsAPI, payload);
    yield put(loadPostsSuccessAction(result.data));
  } catch (err) {
    yield put(loadPostsFailureAction(err.response.data));
  }
}

function* loadPost({ payload }) {
  try {
    const result = yield call(loadPostAPI, payload);
    yield put(loadPostSuccessAction(result.data));
  } catch (err) {
    yield put(loadPostFailureAction(err.response.data));
  }
}

function* addPost({ payload }) {
  try {
    const result = yield call(addPostAPI, payload);
    yield put(addPostSuccessAction(result.data));
    yield put(addPostToMe(result.data.id));
  } catch (err) {
    yield put(addPostFailureAction(err.response.data));
  }
}

function* removePost({ payload }) {
  try {
    const result = yield call(removePostAPI, payload);
    yield put(removePostSuccessAction(result.data));
    yield put(removePostOfMe(result.data));
  } catch (err) {
    yield put(removePostFailureAction(err.response.data));
  }
}

function* addComment({ payload }) {
  try {
    const result = yield call(addCommentAPI, payload);
    yield put(addCommentSuccessAction(result.data));
  } catch (err) {
    yield put(addCommentFailureAction(err.response.data));
  }
}

function likePostAPI(id) {
  return axios.patch(`/post/${id}/like `);
}

function* likePost({ payload }) {
  try {
    const result = yield call(likePostAPI, payload);
    yield put(likePostSuccessAction(result.data));
    // yield put(addPostToMe(result.data.id));
  } catch (err) {
    yield put(likePostFailureAction(err.response.data));
  }
}

function unLikePostAPI(id) {
  return axios.patch(`/post/${id}/unlike`);
}

function* unLikePost({ payload }) {
  try {
    const result = yield call(unLikePostAPI, payload);
    yield put(unLikePostSuccessAction(result.data));
    // yield put(addPostToMe(result.data.id));
  } catch (err) {
    yield put(unLikePostFailureAction(err.response.data));
  }
}

function uploadImagesAPI(data) {
  return axios.post('/post/images', data);
}

function* uploadImages({ payload }) {
  try {
    const result = yield call(uploadImagesAPI, payload);
    yield put(uploadImagesSuccessAction(result.data));
  } catch (err) {
    yield put(uploadImagesFailureAction(err.response.data));
  }
}

function retweetAPI(data) {
  return axios.post(`/post/${data}/retweet`);
}

function* retweet({ payload }) {
  try {
    const result = yield call(retweetAPI, payload);
    yield put(retweetSuccessAction(result.data));
  } catch (err) {
    yield put(retweetFailureAction(err.response.data));
  }
}

function loadUserPostsAPI({ id, pageCnt = 10, lastId }) {
  return axios.get(`/posts/user/${id}`, { params: { pageCnt, lastId } });
}

function* loadUserPosts({ payload }) {
  try {
    const result = yield call(loadUserPostsAPI, payload);
    yield put(loadUserPostsSuccessAction(result.data));
  } catch (err) {
    yield put(loadUserPostsFailureAction(err.response.data));
  }
}

function loadHashtagPostsAPI({ tag, pageCnt = 10, lastId }) {
  return axios.get('/posts/hashtag', { params: { tag, pageCnt, lastId } });
}

function* loadHashtagPosts({ payload }) {
  try {
    const result = yield call(loadHashtagPostsAPI, payload);
    yield put(loadHashtagPostsSuccessAction(result.data));
  } catch (err) {
    yield put(loadHashtagPostsFailureAction(err.response.data));
  }
}

function* loadPostsSaga() {
  yield throttle(3000, LOAD_POSTS_REQUEST, loadPosts);
}

function* loadPostSaga() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* addPostSaga() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* loadUserPostsSaga() {
  yield throttle(3000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* loadHashtagPostsSaga() {
  yield throttle(3000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function* removePostSaga() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* addCommentSaga() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* likePostSaga() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* unLikePostSaga() {
  yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
}

function* uploadImagesSaga() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* retweetSaga() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

export default function* postSaga() {
  yield all([
    fork(loadPostsSaga),
    fork(loadPostSaga),
    fork(loadUserPostsSaga),
    fork(loadHashtagPostsSaga),
    fork(addPostSaga),
    fork(addCommentSaga),
    fork(removePostSaga),
    fork(likePostSaga),
    fork(unLikePostSaga),
    fork(uploadImagesSaga),
    fork(retweetSaga),
  ]);
}
