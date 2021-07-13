import request from "../../api";
import {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
} from "../actionTypes";

export const getChannelDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_DETAILS_REQUEST,
    });

    const { data } = await request.get("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id: id,
      },
    });
    dispatch({
      type: CHANNEL_DETAILS_SUCCESS,
      payload: data.items[0],
    });
  } catch (err) {
    dispatch({
      action: CHANNEL_DETAILS_FAIL,
      payload: err.message,
    });
  }
};

export const getSubscriptionStatus = (id) => async (dispatch, getState) => {
  try {
    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet",
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    console.log(data);
    dispatch({
      type: SET_SUBSCRIPTION_STATUS,
    });
  } catch (err) {
    console.log(err.message);
  }
};
