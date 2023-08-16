import React, { useEffect, useState } from "react";
import "./landing.scss";
import Container from "../../components/container/Container";
import GroupWidget from "../../components/groupWidget/GroupWidget";
import axios from "../../utils/useAxios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bchart from "../../assets/svg/boom-chart.svg";
import blecturer from "../../assets/svg/boom-lecturer.svg";

import bplaylist from "../../assets/svg/boom-playlist.svg";
import btrending from "../../assets/svg/boom-trending.svg";
import bnew from "../../assets/svg/boom-new.svg";
import bgenre from "../../assets/svg/boom-genre.svg";
import { BsFillPlayBtnFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import LandingOptions from "../../components/landingOptions/LandingOptions";
import MyCarousel from "../../components/UI/carousel/myCarousel";
import MobileImageWidget from "./mobileimagewidget/mobileImageWidget";
const Landing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [recent, setRecent] = useState([]);
  const [curPlay, setcurPlay] = useState([]);
  const [trending, setTrending] = useState([]);
  const [ramadan, setRamadan] = useState([]);
  const [quran, setQuran] = useState([]);
  const [isrecent, setisrecent] = useState(false);
  const [images, setimages] = useState([]);

  ////not contented but under presssure by DN project manager
  useEffect(() => {
    const lazy = document.querySelectorAll("#carousels");
    lazy.forEach((im) => {
      const newurl = im.getAttribute("src-data");
      im.src = newurl;
    });
  }, []);

  //const images = [banner1, banner2, banner3, banner4, banner1, banner2, banner3, banner4, banner1]
  useEffect(() => {
    axios
      .get(`/slider_image.php`)
      .then((res) => {
        setimages(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let page = 1;
  useEffect(() => {
    async function fetchData() {
      //trending
      await axios
        .get(`/popular_lec_api.php?langid=8&lim=10&page=${page}`)
        .then((res) => {
          setTrending(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      if (currentUser?.id) {
        await axios
          .get(`/recentApi.php?user_id=${currentUser?.id}&action=get_recent`)
          .then((res) => {
            console.log('user recent',res.data);

            if (res.data?.length === 0) {
              //recent
              setisrecent(false);
              axios
                .get(`/leclisting_lang.php?langid=6&page=${page}`)
                .then((res) => {
                  setRecent(res.data?.slice(0, 10));
                  // console.log("trending: ", res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              const { data } = res.data[0];
              setcurPlay(Object.values(data));
              const recArr = Object.keys(data);
              setisrecent(true);
              console.log(recArr);

              axios
                .get(`/albumlisting_multi_nid_api.php?id=${recArr.toString()}`)
                .then((res) => {
                   console.log("I am the new guy", res);
                  setRecent(res.data?.slice(0, 10));
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        //recent
        setisrecent(false);
        await axios
          .get(`/leclisting_lang.php?langid=6&page=${page}`)
          .then((res) => {
            setRecent(res.data?.slice(0, 10));
            // console.log("trending: ", res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      // ramadan 40217
      await axios
        .get(`/leclisting_cat_api.php?catid=40217&page=${page}`)
        .then((res) => {
          console.log(res.data);

          setRamadan(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      //quran and tafseer 40255

      await axios
        .get(`/leclisting_cat_api.php?catid=40255&page=${page}`)
        .then((res) => {
          console.log(res.data);
          setQuran(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false,
  };
  const settings1 = {
    dots: false,
    infinite: false,
    autoplay: false,
    fade: false,
    speed: 500,
    slidesToShow: 6,
    swipeToSlide: true,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <div className="landing_wrapper my-5">
        <div className="carousel  h-[250px] min-[950px]:h-[250px] min-[1050px]:h-[250px] min-[1283px]:h-[300px]">
          <MyCarousel images={images} />
        </div>

        <Slider className="landing_carousel landing_space" {...settings}>
          {images?.map((image, index) => {
                return (
                  <div   key={index} className="landing_carousel_img">
                        <MobileImageWidget image={image} className="" />
                  </div>
              
                )
            
              
          
          })}
        </Slider>
        <Slider className="landing_options" {...settings1}>
          <LandingOptions text={"Charts"} img={bchart} link={"/charts"} />
          <LandingOptions
            text={"Lecturers"}
            img={blecturer}
            link={"/lecturers"}
          />
          <LandingOptions
            text={"Playlists"}
            img={bplaylist}
            link={"/playlists"}
          />
          <LandingOptions
            text={"Video"}
            icon={<BsFillPlayBtnFill />}
            link={"/videos"}
          />
          <LandingOptions text={"Genre"} img={bgenre} link={"/genres"} />
          <LandingOptions
            text={"Trending"}
            img={btrending}
            link={"/trending"}
          />
          <LandingOptions text={"New"} img={bnew} link={"/new"} />
        </Slider>

        <div className="landing_recent landing_space my-1 min-[615px]:my-3">
          {" "}
          <GroupWidget
            data={recent}
            heading="Recent"
            type={"recent"}
            endpoint_url={"/leclisting_lang.php?langid=6&page="}
            currentPage={page}
            previousPlay={curPlay}
            isrecent={isrecent}
            nav1={{ title: "Home", link: "/home" }}
          />
        </div>
        <div className="landing_trending landing_space my-1 min-[615px]:my-3">
          <GroupWidget
            data={trending}
            heading="Trending"
            type={"lectures"}
            endpoint_url={"/popular_lec_api.php?langid=8&page="}
            currentPage={page}
            nav1={{ title: "Home", link: "/home" }}
          />
        </div>
        <div className="landing_tafsir landing_space my-1 min-[615px]:my-3">
          <GroupWidget
            data={ramadan}
            heading="Ramadan Tafsir"
            type={"lectures"}
            currentPage={''}
          
            nav1={{ title: "Home", link: "/home" }}
          />
        </div>
        <div className="landing_quran landing_space my-1 min-[615px]:my-3">
          <GroupWidget
            data={quran}
            heading="Quran Recitations"
            type={"lectures"}
            
            currentPage={''}
            nav1={{ title: "Home", link: "/home" }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Landing;
