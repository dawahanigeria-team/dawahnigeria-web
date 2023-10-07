import React, { useEffect, useState } from "react";
import "./landing.scss";
import Container from "../../components/container/Container";
import GroupWidget from "../../components/groupWidget/GroupWidget";
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
import { landingPageApis } from "../../services";
import HeadMeta from "../../components/head-meta";
const Landing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [curPlay, setcurPlay] = useState([]);
  const [isrecent, setisrecent] = useState(false);
  const [landingpagedata, setlandingpagedata] = useState({
    images: [],
    specailFeat: [],
    recentlyposted: [],
    recentlyviewed: [],
  });
  const page = 1;
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

useEffect(() => {
  const fetchLandingPageData = async () => {
    try {
      const [
        sliderImages,
        specialFeaturesLectures,
        recentlyPosted,
        recentlyViewed,
      ] = await Promise.all([
        landingPageApis.getSliderImages(),
        landingPageApis.getSpecialFeaturesLectures(),
        landingPageApis.getRecentlyPosted(),
        landingPageApis.getRecentlyViewed(currentUser?.id, page,setisrecent, setcurPlay),
      ]);

      const specialFeatures = specialFeaturesLectures.flatMap((val) => [
        { name: val.name, more: val.more },
      ]);

      setlandingpagedata({
        images: sliderImages,
        specailFeat: specialFeatures,
        recentlyposted: recentlyPosted.slice(0, 10),
        recentlyviewed: recentlyViewed.slice(0, 10),
      });

     // setisrecent(true);
     // setcurPlay(recentlyViewed);
    } catch (error) {
      console.error(error);
    }
  };

  fetchLandingPageData();
}, []);
  

  return (
    <Container>
      <HeadMeta title="DawahNigeria | Home" />
      <div className="landing_wrapper px-[2%] max-[615px]:py-[5%] py-[8%] min-[690px]:py-[2%]">
        <div className="carousel  h-[250px] min-[950px]:h-[250px] min-[1050px]:h-[250px] min-[1283px]:h-[300px]">
          <MyCarousel images={landingpagedata?.images} />
        </div>

        <Slider className="landing_carousel landing_space" {...settings}>
          {landingpagedata?.images?.map((image, index) => {
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
            data={landingpagedata?.recentlyposted}
            heading="Recently Posted"
            type={"lectures"}
            endpoint_url={"/leclisting_recent.php&page="}
            currentPage={page}
            previousPlay={curPlay}
            isrecentpost={true}
            nav1={{ title: "Home", link: HOME }}
          />
        </div>
        <div className="landing_recent landing_space my-1 min-[615px]:my-3">
          {" "}
          <GroupWidget
            data={landingpagedata?.recentlyviewed}
            heading="Recently Viewed"
            type={"recent"}
            endpoint_url={"/leclisting_lang.php?langid=6&page="}
            currentPage={page}
            previousPlay={curPlay}
            isrecent={isrecent}
            nav1={{ title: "Home", link: HOME }}
          />
        </div>

        {Array.isArray(landingpagedata?.specailFeat) &&
          landingpagedata?.specailFeat
            ?.filter(({ more }) => Array.isArray(more) && more.length > 0)
            .map(({ name, more }, idx) => (
              <div
                key={name}
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
            ))}
      </div>
    </Container>
  );
};

export default Landing;
