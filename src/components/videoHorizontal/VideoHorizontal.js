import React, { useState, useEffect } from "react";
import "./videoHorizontal.css";
import { AiFillEye } from "react-icons/ai";
import moment from "moment";
import numeral from "numeral";
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";
import request from "../../api";

const VideoHorizontal = ({ video, searchScreen }) => {
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  const history = useHistory();
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  const isVideo = video.id.kind === "youtube#video";
  const thumbnail = !isVideo && "videoHorizontal__thumbnail-channel";

  useEffect(() => {
    const get_video_details = async () => {
      const { data } = await request.get("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: video.id.videoId ? video.id.videoId : video.id,
        },
      });
      if (data.items[0]?.statistics === undefined) {
        console.log("Undefined");
      }
      setViews(data.items[0]?.statistics?.viewCount);
      setDuration(data.items[0]?.contentDetails?.duration);
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

  const handleClick = () => {
    isVideo
      ? history.push(`/watch/${video.id.videoId ? video.id.videoId : video.id}`)
      : history.push(`/channel/${video.id.channelId}`);
  };

  return (
    <Row
      className="videoHorizontal m-1 py-2 align-items-center"
      onClick={handleClick}
    >
      <Col xs={6} md={searchScreen ? 4 : 6} className="videoHorizontal__left">
        <LazyLoadImage
          src={video.snippet.thumbnails.medium.url}
          className={`videoHorizontal__thumbnail ${thumbnail}`}
          effect="blur"
          wrapperClassName="videoHorizontal__thumbnail-wrapper"
        />
        {isVideo && (
          <span className="videoHorizontal__duration">{_duration}</span>
        )}
      </Col>
      <Col
        xs={6}
        md={searchScreen ? 8 : 6}
        className="videoHorizontal__right p-0"
      >
        <p className="videoHorizontal__title mb-1">{video.snippet.title}</p>
        {isVideo && (
          <div className="videoHorizontal__details">
            <AiFillEye /> {numeral(views).format("0.a")} Views •
            {moment(video.snippet.publishedAt).fromNow()}
          </div>
        )}

        {!isVideo && <p className="mt-1">{video?.snippet?.description}</p>}

        <div className="videoHorizontal__channel d-flex align-items-center my-1">
          {isVideo && <LazyLoadImage src={channelIcon} effect="blur" />}

          <p className="mb-0">{video.snippet.channelTitle}</p>
        </div>
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
