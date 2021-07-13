import React from "react";
import moment from "moment";
import "./comment.css";

const Comment = ({ comment }) => {
  return (
    <div className="comment d-flex p-2">
      <img
        className="rounded-circle mr-3"
        src={comment.authorProfileImageUrl}
        alt="comment_img"
      />
      <div className="comment__body">
        <p className="comment__header mb-1">
          {comment.authorDisplayName} • {moment(comment.publishedAt).fromNow()}
        </p>
        <p className="mb-0">{comment.textDisplay}</p>
      </div>
    </div>
  );
};

export default Comment;
