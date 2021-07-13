import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import { AiFillEye } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import request from "../../api";
import "./video.css";

const Video = ({ video, channelScreen }) => {
  console.log(video);
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  const history = useHistory();

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  useEffect(() => {
    const get_video_details = async () => {
      let videoId;
      if (channelScreen) {
        videoId = video.contentDetails.videoId;
      } else {
        videoId = video.id?.videoId ? video.id.videoId : video.id;
      }
      const { data } = await request.get("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: videoId,
        },
      });
      setViews(data.items[0]?.statistics.viewCount);
      setDuration(data.items[0]?.contentDetails.duration);
    };
    get_video_details();
  }, [video.id]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const { data } = await request.get("/channels", {
        params: {
          part: "snippet",
          id: video.snippet.channelId,
        },
      });
      setChannelIcon(data.items[0].snippet.thumbnails.medium.url);
    };
    get_channel_icon();
  }, [video.snippet.channelId]);

  const handleVideoClick = () => {
    history.push(`/watch/${video.id.videoId ? video.id.videoId : video.id}`);
  };

  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video__top">
        {/* <img src={video.snippet.thumbnails.medium.url} alt="video_image" /> */}
        <LazyLoadImage
          src={video.snippet.thumbnails.medium.url}
          effect="blur"
        />
        <span className="video__top__duration">{_duration}</span>
      </div>
      <div className="video__title">{video.snippet.title}</div>
      <div className="video__details">
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} Views •
        </span>
        <span>{moment(video.snippet.publishedAt).fromNow()}</span>
      </div>
      {!channelScreen && (
        <div className="video__channel">
          {/* <img src={channelIcon} alt="channel_image" /> */}
          <LazyLoadImage src={channelIcon} effect="blur" />
          <p>{video.snippet.channelTitle}.</p>
        </div>
      )}
    </div>
  );
};

export default Video;
