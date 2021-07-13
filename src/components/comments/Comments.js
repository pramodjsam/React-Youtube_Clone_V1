import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getCommentById,
} from "../../redux/actions/comments.action";
import Comment from "../comment/Comment";
import "./comments.css";

const Comments = ({ videoId, totalComment }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentById(videoId));
  }, [dispatch, videoId]);

  const comments = useSelector((state) => state.commentList.comments);
  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  const auth = useSelector((state) => state.auth);
  const { photoUrl } = auth?.user;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length === 0) {
      return;
    }
    dispatch(addComment(videoId, text)); //YOUTUBE API NOT WORKING
    setText("");
  };

  return (
    <div className="comments">
      <p>{totalComment} comments</p>
      <div className="comments__form d-flex w-100 my-2">
        <img className="rounded-circle mr-3" src={photoUrl} alt="comment_img" />
        <form className="d-flex flex-grow-1" onSubmit={handleSubmit}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-grow-1"
            type="text"
            placeholder="Write a comment..."
          />
          <button className="border-0 p-2">Comment</button>
        </form>
      </div>
      <div className="comments__list">
        {_comments?.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
