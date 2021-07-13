import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/actions/auth.action";
import "./loginScreen.css";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = () => {
    dispatch(login());
  };

  const auth = useSelector((state) => state.auth);
  const { accessToken } = auth;

  useEffect(() => {
    if (accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
          alt="youtube_logo"
        />
        <button onClick={handleLogin}>Login with google</button>
        <p>This project is made using YOUTUBE DATA API</p>
      </div>
    </div>
  );
};

export default LoginScreen;
