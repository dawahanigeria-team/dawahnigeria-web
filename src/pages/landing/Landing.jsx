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
import quranIcon from "../../assets/svg/quran.svg";
import { BsFillPlayBtnFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import useAxios from "axios";
import LandingOptions from "../../components/landingOptions/LandingOptions";
import MyCarousel from "../../components/UI/carousel/myCarousel";
import MobileImageWidget from "./mobileimagewidget/mobileImageWidget";
import {
  GENRES,
  HOME,
  CHARTS,
  TRENDING,
  NEW,
  PLAYLISTS,
  PLAY,
  VIDEO,
  LECTURERS,
  QURAN,
} from "../../utils/routes/constants";
import HeadMeta from "../../components/head-meta";
const Landing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [recent, setRecent] = useState([]);
  const [curPlay, setcurPlay] = useState([]);
  const [trending, setTrending] = useState([]);
  const [ramadan, setRamadan] = useState([]);
  const [quran, setQuran] = useState([]);
  const [isrecent, setisrecent] = useState(false);
  const [images, setimages] = useState([]);
  const [specailFeat, setSpecialFeat] = useState([]);

  //const images = [banner1, banner2, banner3, banner4, banner1, banner2, banner3, banner4, banner1]
  useEffect(() => {
    axios
      .get(`/slider_image.php`)
      .then((res) => {
        setimages(res.data);
        //console.log(res);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  let page = 1;
  useEffect(() => {
    async function fetchData() {
      if (currentUser?.id) {
        await axios
          .get(`/recentApi.php?user_id=${currentUser?.id}&action=get_recent`)
          .then((res) => {
            //console.log('user recent',res.data);

            if (res.data?.length === 0) {
              //recent
              setisrecent(false);
              axios
                .get(`/leclisting_lang.php?langid=6&page=${page}`)
                .then((res) => {
                  setRecent(res.data?.slice(0, 10));
                  // //console.log("trending: ", res.data);
                })
                .catch((err) => {
                  //console.log(err);
                });
            } else {
              const { data } = res.data[0];
              setcurPlay(Object.values(data));
              const recArr = Object.keys(data);
              setisrecent(true);
              //console.log(recArr);

              axios
                .get(`/albumlisting_multi_nid_api.php?id=${recArr.toString()}`)
                .then((res) => {
                  //console.log("I am the new guy", res);
                  setRecent(res.data?.slice(0, 10));
                })
                .catch((err) => {
                  //console.log(err);
                });
            }
          })
          .catch((err) => {
            //console.log(err);
          });
      } else {
        //recent
        setisrecent(false);
        await axios
          .get(`/leclisting_lang.php?langid=6&page=${page}`)
          .then((res) => {
            setRecent(res.data?.slice(0, 10));
            // //console.log("trending: ", res.data);
          })
          .catch((err) => {
            //console.log(err);
          });
      }

      await useAxios
        .post(
          `${process.env.REACT_APP_API_ADMINISTER_BASE_URL}/spcl_ftr_api.php`,
          {
            action: "retrieve_spcl_ftr_data",
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          const specialFeatures = res.data?.flatMap((val) => [
            { name: val.name, more: val.more },
          ]);
          setSpecialFeat(specialFeatures);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
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
      <HeadMeta title="DawahNigeria | Home" />
      <div className="landing_wrapper px-[2%] max-[615px]:py-[5%] py-[8%] min-[690px]:py-[2%]">
        <div className="carousel  h-[250px] min-[950px]:h-[250px] min-[1050px]:h-[250px] min-[1283px]:h-[300px]">
          <MyCarousel images={images} />
        </div>

        <Slider className="landing_carousel landing_space" {...settings}>
          {images?.map((image, index) => {
            return (
              <div key={index} className="landing_carousel_img">
                <MobileImageWidget image={image} className="" />
              </div>
            );
          })}
        </Slider>
        <Slider className="landing_options" {...settings1}>
          <LandingOptions text={"Charts"} img={bchart} link={CHARTS} />
          <LandingOptions text={"Lecturers"} img={blecturer} link={LECTURERS} />
          <LandingOptions text={"Quran"} img={quranIcon} link={QURAN} />
          <LandingOptions text={"Playlists"} img={bplaylist} link={PLAY} />
          <LandingOptions
            text={"Video"}
            icon={<BsFillPlayBtnFill />}
            link={VIDEO}
          />
          <LandingOptions text={"Genre"} img={bgenre} link={GENRES} />
          <LandingOptions text={"Trending"} img={btrending} link={TRENDING} />
          <LandingOptions text={"New"} img={bnew} link={NEW} />
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
            nav1={{ title: "Home", link: HOME }}
          />
        </div>

        {Array.isArray(specailFeat) &&
          specailFeat?.map(({ name, more }, idx) => {
            if (Array.isArray(more) && more.length > 0) {
              return (
                <div
                  key={idx}
                  className="landing_tafsir landing_space my-1 min-[615px]:my-3"
                >
                  <GroupWidget
                    data={more}
                    heading={name}
                    type={"lectures"}
                    currentPage={""}
                    nav1={{ title: "Home", link: HOME }}
                  />
                </div>
              );
            }
          })}
      </div>
    </Container>
  );
};

export default Landing;
