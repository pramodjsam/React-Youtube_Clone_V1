import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Video from "../../components/video/Video";
import {
  getPopularVideos,
  getVidoesByCategory,
} from "../../redux/actions/videos.action";
import SkeletonVideo from "../../components/skeleton/SkeletonVideo";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const homeVideos = useSelector((state) => state.homeVideos);
  const { videos, activeCategory, loading } = homeVideos;

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const fetchData = () => {
    if (activeCategory === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVidoesByCategory(activeCategory));
    }
  };

  return (
    <Container>
      <CategoriesBar />
      <Row>
        <InfiniteScroll
          className="row"
          dataLength={videos.length}
          next={fetchData}
          hasMore={true}
          loader={
            <div className="spinner-border d-block mx-auto text-danger"></div>
          }
        >
          {!loading
            ? videos.map((video, index) => (
                <Col lg={3} md={4} key={index}>
                  <Video video={video} />
                </Col>
              ))
            : [...Array(20)].map((key, index) => (
                <Col lg={3} md={4} key={index}>
                  <SkeletonVideo />
                </Col>
              ))}
        </InfiniteScroll>
      </Row>
    </Container>
  );
};

export default HomeScreen;
