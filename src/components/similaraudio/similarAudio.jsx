import React, { useRef, useEffect, useState } from "react";
import back from "../../assets/svg/back.svg";
import "./similarAudio.scss";
import foward from "../../assets/svg/foward.svg";
import { FiChevronsRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import LandingWidget from "../landingWidget/LandingWidget";

const SimilarAudio = ({
  similar,
  heading,
  endpoint_url,
  currentPage,
  current,
  navtitle,
  type,
  url,
}) => {
  const slide = useRef();
  const navigate = useNavigate();
  const [isprev, setisprev] = useState(false);
  const [isnext, setisnext] = useState(true);

  ///////******************/ Similar audios ***********///////////

  //get lectures from the same lecturers
  function prev() {
    // e.stopPropagation()

    ////console.log('window.scrollWidth')
    //console.log(slide.current.scrollLeft);
    //console.log(slide.current.scrollWidth);
    //console.log(slide.current.offsetWidth);
    slide.current.scrollBy({
      left: -slide.current.scrollWidth / 10,
      behavior: "smooth",
    });
  }

  function next() {
    //e.stopPropagation()
    ////console.log('window.scrollWidth')

    //console.log(slide.current.scrollWidth);
    //console.log(slide.current.offsetWidth);
    slide.current.scrollBy({
      left: slide.current.scrollWidth / 10,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    function scrollEl() {
      ////console.log("Slide")
      if (slide.current?.scrollLeft === 0) {
        setisprev(false);
      } else {
        setisprev(true);
      }

      if (
        slide.current?.scrollLeft + slide.current?.offsetWidth >=
        slide.current?.scrollWidth
      ) {
        setisnext(false);
      } else {
        setisnext(true);
      }
    }

    slide.current?.addEventListener("scroll", scrollEl);

    return () => slide.current?.removeEventListener("scroll", scrollEl);
  }, [slide.current?.scrollLeft]);

  return (
    <div className="similarWidget_wrapper">
      <div className="similarWidget_top">
        <p className="similarWidget_top_heading">{heading}</p>
        <div
          onClick={() => {
            navigate("/more", {
              state: {
                name: "",
                heading: heading,
                id: "",
                img: "",
                type,
                endpoint_url,
                currentPage,
                navtitle,
              },
            });
          }}
          className="similarWidget_more"
        >
          <p className="similarWidget_more_text">more</p>
          <FiChevronsRight className="similarWidget_more_icon" />
        </div>
      </div>
      <div className="overflow_hidden_wrapper">
        <div className={isprev ? "prev" : "prev_none"} onClick={prev}>
          <img src={back} alt="back" />
        </div>
        <div className={isnext ? "next" : "next_none"} onClick={next}>
          <img src={foward} alt="foward" />
        </div>
        <div ref={slide} className="overflow_auto_wrapper">
          {similar
            .filter((val) => val.id !== current)
            .map(({ img, lec_img, name, id, views }, idx) => {
              return (
                <div
                  className="similarWidget_album_item"
                  onClick={() => {
                    navigate(`${url}/${id}`);
                    // setendpUrl(similarAudioUrl);
                  }}
                  key={idx + 1}
                >
                  <LandingWidget
                    key={idx}
                    views={views || 0}
                    categories={name}
                    img={img || lec_img}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SimilarAudio;
