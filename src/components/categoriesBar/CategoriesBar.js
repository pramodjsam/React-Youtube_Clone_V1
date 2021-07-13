import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getPopularVideos,
  getVidoesByCategory,
} from "../../redux/actions/videos.action";
import "./categoriesBar.css";

const keywords = [
  "All",
  "React js",
  "Angular js",
  "React Native",
  "use of API",
  "Redux",
  "Music",
  "Algorithm Art ",
  "Guitar",
  "Bengali Songs",
  "Coding",
  "Cricket",
  "Football",
  "Real Madrid",
  "Gatsby",
  "Poor Coder",
  "Shwetabh",
];

const CategoriesBar = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("All");

  const handleClick = (value) => {
    setActive(value);
    if (value === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVidoesByCategory(value));
    }
  };

  return (
    <div className="categoriesBar">
      {keywords.map((value, index) => (
        <span
          onClick={() => handleClick(value)}
          key={index}
          className={active === value ? "active" : ""}
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
