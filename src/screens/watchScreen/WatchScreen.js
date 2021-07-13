import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Comments from "../../components/comments/Comments";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import VideoMetaData from "../../components/videoMetaData/VideoMetaData";
import "./watchScreen.css";
import {
  getVideoById,
  getRelatedVideos,
} from "../../redux/actions/videos.action";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const WatchScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedVideo = useSelector((state) => state.selectedVideo);
  const { video, loading } = selectedVideo;

  const relatedVideos = useSelector((state) => state.relatedVideos);
  const { videos, loading: relatedVideosLoading } = relatedVideos;

  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  return (
    <Row>
      <Helmet>
        <title>{video?.snippet?.title}</title>
      </Helmet>
      <Col lg={8}>
        <div className="watchScreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet?.title}
            height="100%"
            width="100%"
            allowFullScreen
          />
        </div>
        {!loading && video ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <h2>Loading...</h2>
        )}

        <Comments videoId={id} totalComment={video?.statistics?.commentCount} />
      </Col>
      <Col lg={4}>
        {!relatedVideosLoading ? (
          videos
            ?.filter((video) => video.snippet)
            .map((video) => (
              <VideoHorizontal video={video} key={video.id.videoId} />
            ))
        ) : (
          <SkeletonTheme color="#343a40" highlightColor="#3c4147">
            <Skeleton width="100%" height="130px" count={15} />
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;
