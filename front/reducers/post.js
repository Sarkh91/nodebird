import produce from 'immer';

const initialState = {
  mainPosts: [],
  singlePost: null,
  imagePaths: [],
  hasMorePost: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: false,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: false,
  addPostLoading: false,
  addPostDone: false,
  addPostError: false,
  removePostLoading: false,
  removePostDone: false,
  removePostError: false,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: false,
  likePostLoading: false,
  likePostDone: false,
  likePostError: false,
  unLikePostLoading: false,
  unLikePostDone: false,
  unLikePostError: false,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: false,
  retweetLoading: false,
  retweetDone: false,
  retweetError: false,
  IMAGE_PREFIX: 'http://localhost:3065/',
};

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const loadPostsRequestAction = (data) => ({
  type: LOAD_POSTS_REQUEST,
  payload: data,
});
export const loadPostsSuccessAction = (data) => ({
  type: LOAD_POSTS_SUCCESS,
  payload: data,
});
export const loadPostsFailureAction = (error) => ({
  type: LOAD_POSTS_FAILURE,
  payload: error,
});

export const loadPostRequestAction = (data) => ({
  type: LOAD_POST_REQUEST,
  payload: data,
});
export const loadPostSuccessAction = (data) => ({
  type: LOAD_POST_SUCCESS,
  payload: data,
});
export const loadPostFailureAction = (error) => ({
  type: LOAD_POST_FAILURE,
  payload: error,
});

export const addPostRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  payload: data,
});
export const addPostSuccessAction = (data) => ({
  type: ADD_POST_SUCCESS,
  payload: data,
});
export const addPostFailureAction = (error) => ({
  type: ADD_POST_FAILURE,
  payload: error,
});

export const removePostRequestAction = (data) => ({
  type: REMOVE_POST_REQUEST,
  payload: data,
});
export const removePostSuccessAction = (data) => ({
  type: REMOVE_POST_SUCCESS,
  payload: data,
});
export const removePostFailureAction = (error) => ({
  type: REMOVE_POST_FAILURE,
  payload: error,
});

export const addCommentRequestAction = (data) => ({
  type: ADD_COMMENT_REQUEST,
  payload: data,
});
export const addCommentSuccessAction = (data) => ({
  type: ADD_COMMENT_SUCCESS,
  payload: data,
});
export const addCommentFailureAction = (error) => ({
  type: ADD_COMMENT_FAILURE,
  payload: error,
});

export const likePostRequestAction = (data) => ({
  type: LIKE_POST_REQUEST,
  payload: data,
});
export const likePostSuccessAction = (data) => ({
  type: LIKE_POST_SUCCESS,
  payload: data,
});
export const likePostFailureAction = (error) => ({
  type: LIKE_POST_FAILURE,
  payload: error,
});

export const unLikePostRequestAction = (data) => ({
  type: UNLIKE_POST_REQUEST,
  payload: data,
});
export const unLikePostSuccessAction = (data) => ({
  type: UNLIKE_POST_SUCCESS,
  payload: data,
});
export const unLikePostFailureAction = (error) => ({
  type: UNLIKE_POST_FAILURE,
  payload: error,
});

export const uploadImagesRequestAction = (data) => ({
  type: UPLOAD_IMAGES_REQUEST,
  payload: data,
});
export const uploadImagesSuccessAction = (data) => ({
  type: UPLOAD_IMAGES_SUCCESS,
  payload: data,
});
export const uploadImagesFailureAction = (error) => ({
  type: UPLOAD_IMAGES_FAILURE,
  payload: error,
});

export const retweetRequestAction = (data) => ({
  type: RETWEET_REQUEST,
  payload: data,
});
export const retweetSuccessAction = (data) => ({
  type: RETWEET_SUCCESS,
  payload: data,
});
export const retweetFailureAction = (error) => ({
  type: RETWEET_FAILURE,
  payload: error,
});

export const removeImageAction = (data) => ({
  type: REMOVE_IMAGE,
  payload: data,
});

export const loadUserPostsRequestAction = (payload) => ({
  type: LOAD_USER_POSTS_REQUEST,
  payload,
});

export const loadUserPostsSuccessAction = (payload) => ({
  type: LOAD_USER_POSTS_SUCCESS,
  payload,
});

export const loadUserPostsFailureAction = (error) => ({
  type: LOAD_USER_POSTS_FAILURE,
  payload: error,
});

export const loadHashtagPostsRequestAction = (payload) => ({
  type: LOAD_HASHTAG_POSTS_REQUEST,
  payload,
});

export const loadHashtagPostsSuccessAction = (payload) => ({
  type: LOAD_HASHTAG_POSTS_SUCCESS,
  payload,
});

export const loadHashtagPostsFailureAction = (error) => ({
  type: LOAD_HASHTAG_POSTS_FAILURE,
  payload: error,
});

const postReducer = (state = initialState, { type, payload }) => produce(state, (draft) => {
  switch (type) {
    case LOAD_HASHTAG_POSTS_REQUEST:
    case LOAD_USER_POSTS_REQUEST:
    case LOAD_POSTS_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;
    case LOAD_HASHTAG_POSTS_SUCCESS:
    case LOAD_USER_POSTS_SUCCESS:
    case LOAD_POSTS_SUCCESS:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.mainPosts = draft.mainPosts.concat(payload);
      draft.hasMorePost = payload.length === 10;
      break;
    case LOAD_HASHTAG_POSTS_FAILURE:
    case LOAD_USER_POSTS_FAILURE:
    case LOAD_POSTS_FAILURE:
      draft.loadPostsLoading = false;
      draft.loadPostsError = payload;
      break;
    case LOAD_POST_REQUEST:
      draft.loadPostLoading = true;
      draft.loadPostDone = false;
      draft.loadPostError = null;
      break;
    case LOAD_POST_SUCCESS:
      draft.singlePost = payload;
      draft.loadPostLoading = false;
      draft.loadPostDone = true;
      break;
    case LOAD_POST_FAILURE:
      draft.loadPostLoading = false;
      draft.loadPostError = payload;
      break;
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(payload);
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = payload;
      break;
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
      break;
    case REMOVE_POST_SUCCESS:
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== payload.PostId);
      draft.removePostLoading = false;
      draft.removePostDone = true;
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostError = payload;
      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS:
    {
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      const post = draft.mainPosts.find(({ id }) => id === payload.PostId);
      post.Comments.unshift(payload);
      break;
    }
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = payload;
      break;
    case LIKE_POST_REQUEST:
      draft.likePostLoading = true;
      draft.likePostDone = false;
      draft.likePostError = null;
      break;
    case LIKE_POST_SUCCESS:
    {
      const post = draft.mainPosts.find((v) => v.id === payload.PostId);
      post.Likers.push({ id: payload.UserId });
      draft.likePostLoading = false;
      draft.likePostDone = true;
      break;
    }
    case LIKE_POST_FAILURE:
      draft.likePostLoading = false;
      draft.likePostError = payload;
      break;
    case UNLIKE_POST_REQUEST:
      draft.unLikePostLoading = true;
      draft.unLikePostDone = false;
      draft.unLikePostError = null;
      break;
    case UNLIKE_POST_SUCCESS:
    {
      const post = draft.mainPosts.find((v) => v.id === payload.PostId);
      post.Likers = post.Likers.filter((v) => v.id !== payload.UserId);
      draft.unLikePostLoading = false;
      draft.unLikePostDone = true;
      break;
    }
    case UNLIKE_POST_FAILURE:
      draft.unLikePostLoading = false;
      draft.unLikePostError = payload;
      break;
    case UPLOAD_IMAGES_REQUEST:
      draft.uploadImagesLoading = true;
      draft.uploadImagesDone = false;
      draft.uploadImagesError = null;
      break;
    case UPLOAD_IMAGES_SUCCESS:
    {
      draft.imagePaths = payload;
      draft.uploadImagesLoading = false;
      draft.uploadImagesDone = true;
      break;
    }
    case UPLOAD_IMAGES_FAILURE:
      draft.uploadImagesLoading = false;
      draft.uploadImagesError = payload;
      break;
    case RETWEET_REQUEST:
      draft.retweetLoading = true;
      draft.retweetDone = false;
      draft.retweetError = null;
      break;
    case RETWEET_SUCCESS:
    {
      draft.mainPosts.unshift(payload);
      draft.retweetLoading = false;
      draft.retweetDone = true;
      break;
    }
    case RETWEET_FAILURE:
      draft.retweetLoading = false;
      draft.retweetError = payload;
      break;
    case REMOVE_IMAGE:
      draft.imagePaths = draft.imagePaths.filter((v, i) => i !== payload);
      break;
    default:
      break;
  }
});

export default postReducer;
