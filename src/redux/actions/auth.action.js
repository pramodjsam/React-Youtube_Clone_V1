import firebase from "firebase/app";
import auth from "../../firebase";
import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "../actionTypes";

export const login = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
    const res = await auth.signInWithPopup(provider);
    const accessToken = res.credential.accessToken;

    const profile = {
      name: res.additionalUserInfo.profile.name,
      photoUrl: res.additionalUserInfo.profile.picture,
    };

    sessionStorage.setItem("access-token", accessToken);
    sessionStorage.setItem("user-profile", JSON.stringify(profile));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: accessToken,
    });

    dispatch({
      type: LOAD_PROFILE,
      payload: profile,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
      payload: err.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  await auth.signOut();
  dispatch({
    type: LOG_OUT,
  });
  sessionStorage.removeItem("access-token");
  sessionStorage.removeItem("user-profile");
};
