import produce from 'immer';

const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: false,
  logOutLoading: false,
  logOutDone: false,
  logOutError: false,
  signUpLoading: false,
  signUpDone: false,
  signUpError: false,
  followLoading: false,
  followDone: false,
  followError: false,
  unFollowLoading: false,
  unFollowDone: false,
  unFollowError: false,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: false,
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: false,
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: false,
  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: false,
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: false,
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: false,
  me: null,
  userInfo: null,
  signupData: {},
  loginData: {},
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const addPostToMe = (data) => ({
  type: ADD_POST_TO_ME,
  payload: data,
});

export const removePostOfMe = (data) => ({
  type: REMOVE_POST_OF_ME,
  payload: data,
});

export const loginRequestAction = (payload) => ({
  type: LOG_IN_REQUEST,
  payload,
});

export const loginSuccessAction = (data) => ({
  type: LOG_IN_SUCCESS,
  payload: data,
});

export const loginFailureAction = (error) => ({
  type: LOG_IN_FAILURE,
  payload: error,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

export const logoutSuccessAction = () => ({
  type: LOG_OUT_SUCCESS,
});

export const logoutFailureAction = (error) => ({
  type: LOG_OUT_FAILURE,
  payload: error,
});

export const signUpRequestAction = (payload) => ({
  type: SIGN_UP_REQUEST,
  payload,
});

export const signUpSuccessAction = (payload) => ({
  type: SIGN_UP_SUCCESS,
  payload,
});

export const signUpFailureAction = (error) => ({
  type: SIGN_UP_FAILURE,
  payload: error,
});

export const followRequestAction = (payload) => ({
  type: FOLLOW_REQUEST,
  payload,
});

export const followSuccessAction = (payload) => ({
  type: FOLLOW_SUCCESS,
  payload,
});

export const followFailureAction = (error) => ({
  type: FOLLOW_FAILURE,
  payload: error,
});

export const unFollowRequestAction = (payload) => ({
  type: UNFOLLOW_REQUEST,
  payload,
});

export const unFollowSuccessAction = (payload) => ({
  type: UNFOLLOW_SUCCESS,
  payload,
});

export const unFollowFailureAction = (error) => ({
  type: UNFOLLOW_FAILURE,
  payload: error,
});

export const changeNicknameRequestAction = (payload) => ({
  type: CHANGE_NICKNAME_REQUEST,
  payload,
});

export const changeNicknameSuccessAction = (payload) => ({
  type: CHANGE_NICKNAME_SUCCESS,
  payload,
});

export const changeNicknameFailureAction = (error) => ({
  type: CHANGE_NICKNAME_FAILURE,
  payload: error,
});

export const loadMyInfoRequestAction = () => ({
  type: LOAD_MY_INFO_REQUEST,
});

export const loadMyInfoSuccessAction = (payload) => ({
  type: LOAD_MY_INFO_SUCCESS,
  payload,
});

export const loadMyInfoFailureAction = (error) => ({
  type: LOAD_MY_INFO_FAILURE,
  payload: error,
});

export const loadUserRequestAction = (payload) => ({
  type: LOAD_USER_REQUEST,
  payload,
});

export const loadUserSuccessAction = (payload) => ({
  type: LOAD_USER_SUCCESS,
  payload,
});

export const loadUserFailureAction = (error) => ({
  type: LOAD_USER_FAILURE,
  payload: error,
});

export const loadFollowersRequestAction = () => ({
  type: LOAD_FOLLOWERS_REQUEST,
});

export const loadFollowersSuccessAction = (payload) => ({
  type: LOAD_FOLLOWERS_SUCCESS,
  payload,
});

export const loadFollowersFailureAction = (error) => ({
  type: LOAD_FOLLOWERS_FAILURE,
  payload: error,
});

export const loadFollowingsRequestAction = () => ({
  type: LOAD_FOLLOWINGS_REQUEST,
});

export const loadFollowingsSuccessAction = (payload) => ({
  type: LOAD_FOLLOWINGS_SUCCESS,
  payload,
});

export const loadFollowingsFailureAction = (error) => ({
  type: LOAD_FOLLOWINGS_FAILURE,
  payload: error,
});

export const removeFollowerRequestAction = (payload) => ({
  type: REMOVE_FOLLOWER_REQUEST,
  payload,
});

export const removeFollowerSuccessAction = (payload) => ({
  type: REMOVE_FOLLOWER_SUCCESS,
  payload,
});

export const removeFollowerFailureAction = (error) => ({
  type: REMOVE_FOLLOWER_FAILURE,
  payload: error,
});

const userReducer = (state = initialState, { type, payload }) => produce(state, (draft) => {
  switch (type) {
    case LOG_IN_REQUEST:
      draft.logInLoading = true;
      draft.logInDone = false;
      draft.logInError = null;
      break;
    case LOG_IN_SUCCESS:
      draft.logInLoading = false;
      draft.logInDone = true;
      draft.me = payload;
      break;
    case LOG_IN_FAILURE:
      draft.logInLoading = false;
      draft.logInError = payload;
      break;
    case LOG_OUT_REQUEST:
      draft.logOutLoading = true;
      draft.logOutDone = false;
      draft.logOutError = null;
      break;
    case LOG_OUT_SUCCESS:
      draft.logOutLoading = false;
      draft.logOutDone = true;
      draft.me = null;
      break;
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false;
      draft.logOutError = payload;
      break;
    case SIGN_UP_REQUEST:
      draft.signUpLoading = true;
      draft.signUpDone = false;
      draft.signUpError = null;
      break;
    case SIGN_UP_SUCCESS:
      draft.signUpLoading = false;
      draft.signUpDone = true;
      break;
    case SIGN_UP_FAILURE:
      draft.signUpLoading = false;
      draft.signUpError = payload;
      break;
    case FOLLOW_REQUEST:
      draft.followLoading = true;
      draft.followDone = false;
      draft.followError = null;
      break;
    case FOLLOW_SUCCESS:
      draft.followLoading = false;
      draft.me.Followings.push({ id: payload.UserId });
      draft.followDone = true;
      break;
    case FOLLOW_FAILURE:
      draft.followLoading = false;
      draft.followError = false;
      break;
    case UNFOLLOW_REQUEST:
      draft.unFollowLoading = true;
      draft.unFollowDone = false;
      draft.unFollowError = null;
      break;
    case UNFOLLOW_SUCCESS:
      draft.unFollowLoading = false;
      draft.me.Followings = draft.me?.Followings.filter((v) => v.id !== payload.UserId);
      draft.unFollowDone = true;
      break;
    case UNFOLLOW_FAILURE:
      draft.unFollowLoading = false;
      draft.unFollowError = payload;
      break;
    case CHANGE_NICKNAME_REQUEST:
      draft.changeNicknameLoading = true;
      draft.changeNicknameDone = false;
      draft.changeNicknameError = null;
      break;
    case CHANGE_NICKNAME_SUCCESS:
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = true;
      draft.me.nickname = payload.nickname;
      break;
    case CHANGE_NICKNAME_FAILURE:
      draft.changeNicknameLoading = false;
      draft.changeNicknameError = payload;
      break;
    case LOAD_FOLLOWERS_REQUEST:
      draft.loadFollowersLoading = true;
      draft.loadFollowersDone = false;
      draft.loadFollowersError = null;
      break;
    case LOAD_FOLLOWERS_SUCCESS:
      draft.loadFollowersLoading = false;
      draft.loadFollowersDone = true;
      draft.me.Followers = payload;
      break;
    case LOAD_FOLLOWERS_FAILURE:
      draft.loadFollowersLoading = false;
      draft.loadFollowersError = payload;
      break;
    case LOAD_FOLLOWINGS_REQUEST:
      draft.loadFollowingsLoading = true;
      draft.loadFollowingsDone = false;
      draft.loadFollowingsError = null;
      break;
    case LOAD_FOLLOWINGS_SUCCESS:
      draft.loadFollowingsLoading = false;
      draft.loadFollowingsDone = true;
      draft.me.Followings = payload;
      break;
    case LOAD_FOLLOWINGS_FAILURE:
      draft.loadFollowingsLoading = false;
      draft.loadFollowingsError = payload;
      break;
    case REMOVE_FOLLOWER_REQUEST:
      draft.removeFollowerLoading = true;
      draft.removeFollowerDone = false;
      draft.removeFollowerError = null;
      break;
    case REMOVE_FOLLOWER_SUCCESS:
      draft.removeFollowerLoading = false;
      draft.removeFollowerDone = true;
      draft.me.Followers = draft.me.Followers.filter((v) => v.id !== payload.userId);
      break;
    case REMOVE_FOLLOWER_FAILURE:
      draft.removeFollowerLoading = false;
      draft.removeFollowerError = payload;
      break;
    case LOAD_MY_INFO_REQUEST:
      draft.loadMyInfoLoading = true;
      draft.loadMyInfoDone = false;
      draft.loadMyInfoError = null;
      break;
    case LOAD_MY_INFO_SUCCESS:
      draft.loadMyInfoLoading = false;
      draft.me = payload;

      if (payload) {
        draft.logInDone = true;
      }
      draft.loadMyInfoDone = true;
      break;
    case LOAD_MY_INFO_FAILURE:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoError = payload;
      break;
    case LOAD_USER_REQUEST:
      draft.loadUserLoading = true;
      draft.loadUserDone = false;
      draft.loadUserError = null;
      break;
    case LOAD_USER_SUCCESS:
      draft.loadUserLoading = false;
      draft.loadUserDone = true;
      draft.userInfo = payload;
      break;
    case LOAD_USER_FAILURE:
      draft.loadUserLoading = false;
      draft.loadUserError = payload;
      break;
    case ADD_POST_TO_ME:
      draft.me.Posts.unshift({ id: payload });
      break;
    case REMOVE_POST_OF_ME:
      draft.me.Posts = draft.me.Posts.filter((v) => v.id !== payload.PostId);
      break;
    default:
      break;
  }
});

export default userReducer;
