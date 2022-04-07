import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  CHANGE_NICKNAME_REQUEST,
  changeNicknameFailureAction,
  changeNicknameSuccessAction,
  FOLLOW_REQUEST,
  followFailureAction,
  followSuccessAction,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST,
  loadFollowersFailureAction,
  loadFollowersSuccessAction,
  loadFollowingsFailureAction,
  loadFollowingsSuccessAction,
  loadMyInfoFailureAction,
  loadMyInfoSuccessAction, loadUserFailureAction, loadUserSuccessAction,
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  loginFailureAction,
  loginSuccessAction,
  logoutFailureAction,
  logoutSuccessAction,
  REMOVE_FOLLOWER_REQUEST,
  removeFollowerFailureAction,
  removeFollowerSuccessAction,
  SIGN_UP_REQUEST,
  signUpFailureAction,
  signUpSuccessAction,
  UNFOLLOW_REQUEST,
  unFollowFailureAction,
  unFollowSuccessAction,
} from '../reducers/user';

function loginAPI(data) {
  return axios.post('/user/login', data);
}

function* login({ payload }) {
  try {
    // yield delay(1000);
    const result = yield call(loginAPI, payload);
    yield put(loginSuccessAction(result.data));
  } catch (err) {
    yield put(loginFailureAction(err.response.data));
  }
}

function logoutAPI(data) {
  return axios.post('/user/logout', data);
}

function* logout({ payload }) {
  try {
    yield call(logoutAPI, payload);
    yield put(logoutSuccessAction());
  } catch (err) {
    yield put(logoutFailureAction(err.response.data));
  }
}

function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put(loadMyInfoSuccessAction(result.data));
  } catch (err) {
    yield put(loadMyInfoFailureAction(err.response.data));
  }
}

function loadUserAPI(id) {
  return axios.get(`/user/${id}`);
}

function* loadUser({ payload }) {
  try {
    const result = yield call(loadUserAPI, payload);
    yield put(loadUserSuccessAction(result.data));
  } catch (err) {
    yield put(loadUserFailureAction(err.response.data));
  }
}

function signupAPI(data) {
  return axios.post('/user', data);
}

function* signup({ payload }) {
  try {
    const result = yield call(signupAPI, payload);
    yield put(signUpSuccessAction(result));
  } catch (err) {
    yield put(signUpFailureAction(err.response.data));
  }
}

function followAPI(data) {
  return axios.post('/user/follow', data);
}

function* follow({ payload }) {
  try {
    const result = yield call(followAPI, payload);
    yield put(followSuccessAction(result.data));
  } catch (err) {
    yield put(followFailureAction(err.response.data));
  }
}

function unfollowAPI(data) {
  return axios.post('/user/unfollow', data);
}

function* unfollow({ payload }) {
  try {
    const result = yield call(unfollowAPI, payload);
    yield put(unFollowSuccessAction(result.data));
  } catch (err) {
    yield put(unFollowFailureAction(err.response.data));
  }
}

function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', data);
}

function* changeNickname({ payload }) {
  try {
    const result = yield call(changeNicknameAPI, payload);
    yield put(changeNicknameSuccessAction(result.data));
  } catch (err) {
    yield put(changeNicknameFailureAction(err.response.data));
  }
}

function loadFollowersAPI() {
  return axios.get('/user/followers');
}

function* loadFollowers() {
  try {
    const result = yield call(loadFollowersAPI);
    yield put(loadFollowersSuccessAction(result.data));
  } catch (err) {
    yield put(loadFollowersFailureAction(err.response.data));
  }
}

function loadFollowingsAPI() {
  return axios.get('/user/followings');
}

function* loadFollowings() {
  try {
    const result = yield call(loadFollowingsAPI);
    yield put(loadFollowingsSuccessAction(result.data));
  } catch (err) {
    yield put(loadFollowingsFailureAction(err.response.data));
  }
}

function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`);
}

function* removeFollower({ payload }) {
  try {
    const result = yield call(removeFollowerAPI, payload);
    yield put(removeFollowerSuccessAction(result.data));
  } catch (err) {
    yield put(removeFollowerFailureAction(err.response.data));
  }
}

function* loginSaga() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* logoutSaga() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* loadMyInfoSaga() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* loadUserSaga() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* signUpSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}

function* followSaga() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* unFollowSaga() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* loadFollowersSaga() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* loadFollowingsSaga() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* changeNicknameSaga() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* removeFollowerSaga() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

export default function* userSaga() {
  yield all([
    fork(loginSaga),
    fork(logoutSaga),
    fork(loadMyInfoSaga),
    fork(loadUserSaga),
    fork(signUpSaga),
    fork(followSaga),
    fork(unFollowSaga),
    fork(loadFollowersSaga),
    fork(loadFollowingsSaga),
    fork(changeNicknameSaga),
    fork(removeFollowerSaga),
  ]);
}
