import React, { useState } from "react";
import "./comment.scss";
import { SlEmotsmile } from "react-icons/sl";
import logo from "../../assets/png/dn logo.png";
import axios from "../../utils/useAxios";
import { toast } from "../../utils/conditionalToast"; // SSR-safe toast utility
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CommentBox = ({ id, audioComment, type }) => {
  const [comment, setComment] = useState();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const postComment = () => {
    if (!currentUser?.id) {
      navigate("/auth/login");
      toast.error("Login or register to comment");
      return;
    }
    if (comment === "") return;

    const payload = {
      user_id: currentUser?.id,
      item_id: id,
      type: type,
      comment: comment,
    };
    //post comment
    axios
      .post(`/commentApi.php`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
        },
      })
      .then((res) => {
        setComment("");
      })
      .catch((err) => {});
  };

  return (
    <div className="comment-box">
      <div className="lecalb_comments_header text-foreground">Comments</div>
      <textarea
        className="lecalb_comment_input bg-comment"
        placeholder="Pls share your thoughts"
        name=""
        id=""
        cols="30"
        value={comment}
        rows="5"
        maxLength="500"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></textarea>
      <div className="lecalb_comment_action">
        <SlEmotsmile className="lecalb_comment_moji" />
        <button onClick={postComment} className="lecalb_comment_button">
          Comment
        </button>
      </div>

      <div className="aud_comment_texts">
        {Array.isArray(audioComment) &&
          audioComment?.map(({ user, date, content }, idx) => {
            return (
              <div className="com_wrap">
                <div className="com_date">
                  <span className="logo_img">
                    <img className="logo_img_sz" src={logo} alt="" />
                  </span>
                  <span className="commentor">{user}</span>
                  <span className="comment_date">{date}</span>
                </div>
                <div className="comment_content">{content}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CommentBox;
