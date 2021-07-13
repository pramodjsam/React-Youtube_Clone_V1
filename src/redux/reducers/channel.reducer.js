import {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
} from "../actionTypes";

const initialState = {
  loading: false,
  channel: {},
};

export const channelDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANNEL_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANNEL_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        channel: action.payload,
      };
    case CHANNEL_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        channel: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
