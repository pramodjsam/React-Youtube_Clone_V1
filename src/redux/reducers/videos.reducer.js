import {
  CHANNEL_VIDEOS_FAIL,
  CHANNEL_VIDEOS_REQUEST,
  CHANNEL_VIDEOS_SUCCESS,
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  RELATED_VIDEOS_FAIL,
  RELATED_VIDEOS_REQUEST,
  RELATED_VIDEOS_SUCCESS,
  SEARCHED_VIDEOS_FAIL,
  SEARCHED_VIDEOS_REQUEST,
  SEARCHED_VIDEOS_SUCCESS,
  SELECTED_VIDEO_FAIL,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
  SUBSCRIPTIONS_CHANNEL_FAIL,
  SUBSCRIPTIONS_CHANNEL_REQUEST,
  SUBSCRIPTIONS_CHANNEL_SUCCESS,
} from "../actionTypes";

const initialState = {
  videos: [],
  nextPageToken: null,
  loading: false,
  activeCategory: "All",
};

export const homeVideosReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HOME_VIDEOS_SUCCESS:
      return {
        ...state,
        videos:
          state.activeCategory === action.payload.category
            ? [...state.videos, ...action.payload.videos]
            : action.payload.videos,
        loading: false,
        nextPageToken: action.payload.nextPageToken,
        activeCategory: action.payload.category,
      };
    case HOME_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const selectedVideoInitialState = {
  loading: false,
  video: null,
};

export const selectedVideoReducer = (
  state = selectedVideoInitialState,
  action
) => {
  switch (action.type) {
    case SELECTED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SELECTED_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        video: action.payload,
      };
    case SELECTED_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        video: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

const relatedVideoInitialState = {
  videos: [],
  loading: false,
};

export const relatedVideosReducer = (
  state = relatedVideoInitialState,
  action
) => {
  switch (action.type) {
    case RELATED_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RELATED_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: action.payload,
      };
    case RELATED_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const searchedVideosInitialState = {
  loading: false,
  videos: [],
};

export const searchedVideosReducer = (
  state = searchedVideosInitialState,
  action
) => {
  switch (action.type) {
    case SEARCHED_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCHED_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: action.payload,
      };
    case SEARCHED_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const subscriptionsChannelInitialState = {
  loading: false,
  videos: [],
};

export const subscriptionsChannelReducer = (
  state = subscriptionsChannelInitialState,
  action
) => {
  switch (action.type) {
    case SUBSCRIPTIONS_CHANNEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUBSCRIPTIONS_CHANNEL_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: action.payload,
      };
    case SUBSCRIPTIONS_CHANNEL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const channelVideosInitialState = {
  loading: false,
  videos: [],
};

export const channelVideosReducer = (
  state = channelVideosInitialState,
  action
) => {
  switch (action.type) {
    case CHANNEL_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANNEL_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: action.payload,
      };
    case CHANNEL_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
