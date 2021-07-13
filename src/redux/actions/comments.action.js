import request from "../../api";
import {
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
} from "../actionTypes";

export const getCommentById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENT_LIST_REQUEST,
    });
    const { data } = await request.get("/commentThreads", {
      params: {
        part: "snippet",
        videoId: id,
      },
    });
    dispatch({
      type: COMMENT_LIST_SUCCESS,
      payload: data.items,
    });
  } catch (err) {
    dispatch({
      type: COMMENT_LIST_FAIL,
      payload: err.message,
    });
  }
};

export const addComment = (id, text) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_COMMENT_REQUEST,
    });
    const obj = {
      snippet: {
        videoId: id,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    };

    const res = await request.post("/commentThreads", obj, {
      params: {
        part: "snippet",
        // videoId: id,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    console.log(res);
    dispatch({
      type: CREATE_COMMENT_SUCCESS,
    });
    setTimeout(() => {
      dispatch(getCommentById(id));
    }, 3000);
  } catch (err) {
    console.log(err);
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload: err.message,
    });
  }
};
