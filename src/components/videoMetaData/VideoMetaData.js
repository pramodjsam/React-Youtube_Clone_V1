import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import numeral from "numeral";
import moment from "moment";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import {
  getChannelDetails,
  // getSubscriptionStatus,
} from "../../redux/actions/channel.action";
import ShowMoreText from "react-show-more-text";
import "./videoMetaData.css";
import HelmetCustom from "../HelmetCustom";

const VideoMetaData = ({ video, videoId }) => {
  const { channelId, channelTitle, title, description, publishedAt } =
    video.snippet;
  const { viewCount, likeCount, dislikeCount } = video.statistics;
  const dispatch = useDispatch();
  const channelDetails = useSelector((state) => state.channelDetails);
  const {
    channel: { snippet: channelSnippet, statistics: channelStatistics },
  } = channelDetails;

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    // dispatch(getSubscriptionStatus(channelId)); YOUTUBE API NOT WORKING FOR THIS PART
  }, [dispatch, channelId]);

  return (
    <div className="videoMetaData py-2">
      <HelmetCustom title={title} description={description} />
      <div className="videoMetaData__top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(viewCount).format("0.a")} Views •{" "}
            {moment(publishedAt).fromNow()}
          </span>
          <div>
            <span className="mr-3">
              <MdThumbUp size={26} /> {numeral(likeCount).format("0.a")}{" "}
            </span>
            <span className="mr-3">
              <MdThumbDown size={26} /> {numeral(dislikeCount).format("0.a")}
            </span>
          </div>
        </div>
      </div>
      <div className="videoMetaData__channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex">
          <img
            alt="videometadata_image"
            src={channelSnippet?.thumbnails?.default?.url}
            className="rounded-circle mr-3 video_img"
            style={{ height: "150px", width: "150px" }}
          />
          <div className="d-flex flex-column">
            <span>{channelTitle}</span>
            <span>
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              Subscribers
            </span>
          </div>
        </div>
        <button className="btn border-0 p-2 m-2">Subscribe</button>
      </div>
      <div className="videoMetaData__description">
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="showMoreText"
          expanded={false}
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
