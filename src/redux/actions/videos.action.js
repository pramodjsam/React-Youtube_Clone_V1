import request from "../../api";
import {
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_SUCCESS,
  SELECTED_VIDEO_FAIL,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
  RELATED_VIDEOS_FAIL,
  RELATED_VIDEOS_REQUEST,
  RELATED_VIDEOS_SUCCESS,
  SEARCHED_VIDEOS_REQUEST,
  SEARCHED_VIDEOS_SUCCESS,
  SEARCHED_VIDEOS_FAIL,
  SUBSCRIPTIONS_CHANNEL_REQUEST,
  SUBSCRIPTIONS_CHANNEL_SUCCESS,
  SUBSCRIPTIONS_CHANNEL_FAIL,
  CHANNEL_VIDEOS_REQUEST,
  CHANNEL_VIDEOS_SUCCESS,
  CHANNEL_VIDEOS_FAIL,
} from "../actionTypes";

export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });
    const res = await request.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "US",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
      },
    });
    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: res.data.items,
        nextPageToken: res.data.nextPageToken,
        category: "All",
      },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: err,
    });
  }
};

export const getVidoesByCategory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });
    const res = await request.get("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
        q: keyword,
        type: "video",
      },
    });
    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: res.data.items,
        nextPageToken: res.data.nextPageToken,
        category: keyword,
      },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: err,
    });
  }
};

export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_VIDEO_REQUEST,
    });
    const { data } = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        id: id,
      },
    });
    dispatch({
      type: SELECTED_VIDEO_SUCCESS,
      payload: data.items[0],
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SELECTED_VIDEO_FAIL,
      payload: err.message,
    });
  }
};

export const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({
      type: RELATED_VIDEOS_REQUEST,
    });
    const { data } = await request.get("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        maxResults: 15,
        type: "video",
      },
    });
    dispatch({
      type: RELATED_VIDEOS_SUCCESS,
      payload: data.items,
    });
  } catch (err) {
    dispatch({
      type: RELATED_VIDEOS_FAIL,
      payload: err.message,
    });
  }
};

export const getVideosBySearch = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEARCHED_VIDEOS_REQUEST,
    });
    const { data } = await request.get("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        q: keyword,
        type: "video,channel",
      },
    });

    dispatch({
      type: SEARCHED_VIDEOS_SUCCESS,
      payload: data.items,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SEARCHED_VIDEOS_FAIL,
      payload: err,
    });
  }
};

export const getSubscriptionByChannel = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_REQUEST,
    });
    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet,contentDetails",
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    console.log(data);
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
      payload: data.items,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_FAIL,
      payload: err.message,
    });
  }
};

export const getVideosByChannel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_VIDEOS_REQUEST,
    });
    const { data } = await request.get("/channels", {
      params: {
        part: "contentDetails",
        id: id,
      },
    });
    const uploadPlaylistId =
      data.items[0].contentDetails.relatedPlaylists.uploads;

    const res = await request.get("/playlistItems", {
      params: {
        part: "contentDetails,snippet",
        playlistId: uploadPlaylistId,
        maxResults: 30,
      },
    });

    dispatch({
      type: CHANNEL_VIDEOS_SUCCESS,
      payload: res.data.items,
    });
  } catch (err) {
    dispatch({
      type: CHANNEL_VIDEOS_FAIL,
      payload: err.message,
    });
  }
};
