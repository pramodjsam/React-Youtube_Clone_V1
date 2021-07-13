import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSubscriptionByChannel } from "../../redux/actions/videos.action";
import "./subscriptionScreen.css";

const SubscriptionScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscriptionByChannel());
  }, [dispatch]);

  return <div>YOUTUBE API NOT WORKING FOR SUBSCRIPTION PART</div>;
};

export default SubscriptionScreen;
