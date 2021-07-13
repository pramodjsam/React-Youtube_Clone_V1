import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoHorizontal from "../components/videoHorizontal/VideoHorizontal";
import { getVideosBySearch } from "../redux/actions/videos.action";

const SearchScreen = () => {
  const dispatch = useDispatch();
  const { query } = useParams();
  const searchedVideos = useSelector((state) => state.searchedVideos);
  const { videos, loading } = searchedVideos;

  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [dispatch, query]);

  return (
    <Container>
      {!loading ? (
        videos?.map((video) => (
          <VideoHorizontal
            video={video}
            searchScreen
            key={video.id.videoId ? video.id.videoId : video.id}
          />
        ))
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SearchScreen;
