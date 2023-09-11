import React, { useEffect } from "react";
import "./recommendwidget.scss";
import Rec1_circle from "../../assets/png/recommend_circle.png";
import Rec1_rect from "../../assets/png/recommend_rect.png";
import { BiLike } from "react-icons/bi";
import { HiShare } from "react-icons/hi";
import { TbMessage2 } from "react-icons/tb";
const Recommend_widget = ({ img, title, rpname, catsname }) => {
  // //console.log(title.split(" - "));

  ////not contented but under presssure by DN project manager
  useEffect(() => {
    const lazy = document.querySelectorAll("#recommend");
    lazy.forEach((im) => {
      const newurl = im.getAttribute("src-data");
      im.src = newurl;
    });
  }, []);

  return (
    <div className="recwid_wrapper">
      <div className="recwid_left">
        <img
          className="recwid_left_img"
          id="recommend"
          src-data={img}
          src={"https://imagetolink.com/ib/ITczTtYvdR.jpeg"}
          alt="rect_circle"
        />
      </div>
      <div className="recwid_right_wrapper">
        <div className="recwid_right">
          <div className="recwid_right_head_wrap">
            <p className="recwid_right_head1">{title.split(" - ")[0]}</p>
            <p className="recwid_right_head2">{title.split(" - ")[1]}</p>
          </div>
          <p className="recwid_right_mid">{catsname}</p>
          <div className="recwid_right_action">
            <div className="recwid_like">
              <BiLike className="recwid_like_icon" />
              <p className="recwid_like_text">12.7k</p>
            </div>
            <div className="recwid_share">
              <HiShare className="recwid_share_icon" />
              <p className="recwid_share_text">4k</p>
            </div>
            <div className="recwid_comment">
              <TbMessage2 className="recwid_comment_icon" />
              <p className="recwid_comment_text">3.1k</p>
            </div>
          </div>
        </div>

        <div className="recwid_right_img">
          <img
            className="rec_img_sz"
            id="recommend"
            src-data={img}
            src={"https://imagetolink.com/ib/ITczTtYvdR.jpeg"}
            alt="Rec1rect"
          />
        </div>
      </div>
    </div>
  );
};

export default Recommend_widget;
