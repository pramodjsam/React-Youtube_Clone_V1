import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_PROFILE,
  LOG_OUT,
} from "../actionTypes";

const initialState = {
  accessToken: sessionStorage.getItem("access-token")
    ? sessionStorage.getItem("access-token")
    : null,
  user: sessionStorage.getItem("user-profile")
    ? JSON.parse(sessionStorage.getItem("user-profile"))
    : null,
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        accessToken: null,
        loading: false,
        error: action.payload,
      };
    case LOAD_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        accessToken: null,
        user: null,
      };
    default:
      return state;
  }
};
