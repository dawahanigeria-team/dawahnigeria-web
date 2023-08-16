import React, {useEffect} from "react";
import "./videoWidget.scss";
import { FaPlay } from "react-icons/fa";

import { BiHeart } from "react-icons/bi";
import videoButtom from "../../assets/png/videoButtom.png";
import { formatNumber } from "../UI/formatter";

const VideoWidget = ({ img, favourites, views, lecturer, title, duration }) => {

     ////not contented but under presssure by DN project manager
useEffect(() => {
  function lazyImage () {
    const lazy  = document.querySelectorAll('#video')
    lazy.forEach((im) => {
      const newurl = im.getAttribute('src-data')
      im.src = newurl 

      im.addEventListener('error', () => {
        im.src = 'https://imagetolink.com/ib/cswCjNKbQ2.jpeg'
      })
    })
  }

  lazyImage()

},[])
  return (
    <div className="videoWidget_wrapper">
      <div className="videoWidget_top">
        <img
        id='video'
          src-data={img}
          src={'https://imagetolink.com/ib/cswCjNKbQ2.jpeg'}
          alt="background"
          className="videoWidget_background_image"
        />
        <div className="videoWidget_play_wrapper">
        <div className="videoWidget_play">
          <FaPlay className="videoWidget_play_icon" />
        </div>
        </div>
        
        <div className="videoWidget_duration px-1">
          <div className="videoWidget_duration_text">{duration}</div>
        </div>
      </div>
      <div className="videoWidget_buttom">
        <div className="videoWidget_buttom_left">
          <marquee direction="left" className="videoWidget_buttom_head">
            {title}
          </marquee>
     
          
        </div>
        <div className="videoWidget_bottom_overall">
        <div className="videoWidget_buttom_lecturer_wrapper">
           <div className="vid_widget_image rounded-full">
           <img className="w-full h-full rounded-full" src-data={videoButtom} src={'https://imagetolink.com/ib/kk8U1nb2nR.jpeg'} alt="videoButtom" />
           </div>
           <div className="rel_text">
                <div className="videoWidget_buttom_lecturer">
                {lecturer}

                </div>
              </div>
          
          </div>
          <div className="videoWidget_buttom_right">
          <BiHeart className="videoWidget_buttom_right_icon" />
          <p className="videoWidget_buttom_right_text">{formatNumber(favourites || 0)}</p>
        </div>
</div>
       
      </div>
    </div>
  );
};

export default VideoWidget;
