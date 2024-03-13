import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./landing.scss";
import Container from "../../components/container/Container";
import GroupWidget from "../../components/groupWidget/GroupWidget";
import Slider from "react-slick";
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
import { settings, settings1 } from "./utils";
import CarouselSkeleton from "../../components/skeletion/carousel.skeleton";
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
  RAMADAN,
} from "../../utils/routes/constants";
import HeadMeta from "../../components/head-meta";
import { useLandingPageHook } from "../../hooks/landing";

import RowSkeletonContainer from "../../components/skeletion/skeleton.container";

const Landing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [curPlay, setcurPlay] = useState([]);
  const [isrecent, setisrecent] = useState(false);
  const id = currentUser?.id;
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

  const [sliders, recentlyPosted, specialFeatures, recentlyviewed] =
    useLandingPageHook(id, page, setisrecent, setcurPlay);

  const specialFeat = specialFeatures?.data?.flatMap((val) => [
    { name: val.name, more: val.more },
  ]);

  return (
    <Container>
      <HeadMeta title="Welcome to Dawah Nigeria - Home of Islamic resources" />
      <div className="landing_wrapper px-[2%]  max-[615px]:py-[5%] py-[8%] min-[690px]:py-[2%]">
        {sliders?.data?.length > 1 ? (
          <>
            <div className="carousel  h-[250px] min-[950px]:h-[250px] min-[1050px]:h-[250px] min-[1283px]:h-[300px]">
              <MyCarousel images={sliders?.data} />
            </div>

            <Slider className="landing_carousel landing_space" {...settings}>
              {sliders?.data?.map((image, index) => {
                return (
                  <div key={image} className="landing_carousel_img">
                    <MobileImageWidget image={image} className="" />
                  </div>
                );
              })}
            </Slider>
            <Slider className="landing_options" {...settings1}>
              <LandingOptions text={"Ramadan"} img={bplaylist} link={RAMADAN} />
              <LandingOptions text={"Charts"} img={bchart} link={CHARTS} />
              <LandingOptions
                text={"Lecturers"}
                img={blecturer}
                link={LECTURERS}
              />
              <LandingOptions text={"Quran"} img={quranIcon} link={QURAN} />
              <LandingOptions text={"Playlists"} img={bplaylist} link={PLAY} />
              <LandingOptions
                text={"Video"}
                icon={<BsFillPlayBtnFill />}
                link={VIDEO}
              />
              <LandingOptions text={"Genre"} img={bgenre} link={GENRES} />
              <LandingOptions
                text={"Trending"}
                img={btrending}
                link={TRENDING}
              />
              <LandingOptions text={"New"} img={bnew} link={NEW} />
            </Slider>
          </>
        ) : (
          <CarouselSkeleton />
        )}
        {recentlyPosted?.isSuccess && Array.isArray(recentlyPosted?.data) && (
          <div className="landing_recent landing_space my-1 min-[615px]:my-3">
            {" "}
            <GroupWidget
              data={recentlyPosted?.data.slice(0, 10)}
              heading="Recently Posted"
              type={"lectures"}
              endpoint_url={
                "/leclisting_recent.php?&action=get_recent_audio&page="
              }
              currentPage={page}
              isrecentpost={true}
              nav1={{ title: "Home", link: HOME }}
            />
          </div>
        )}
        {recentlyviewed?.isSuccess && Array.isArray(recentlyviewed?.data) && (
          <div className="landing_recent landing_space my-1 min-[615px]:my-3">
            {" "}
            <GroupWidget
              data={recentlyviewed?.data}
              heading="Recently Viewed"
              type={"recent"}
              endpoint_url={"/leclisting_lang.php?langid=6&page="}
              currentPage={page}
              previousPlay={curPlay}
              isrecent={isrecent}
              nav1={{ title: "Home", link: HOME }}
            />
          </div>
        )}
        {/**
            : (
            <div className="landing_recent landing_space my-1 min-[615px]:my-3">
              <RowSkeletonContainer />
            </div>
          )
           */}

        {Array.isArray(specialFeat) &&
          specialFeat
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

        {Array.isArray(specialFeat) &&
          specialFeat.length === 0 &&
          Array(10)
            .fill(undefined)
            .map((_, i) => (
              <div
                key={i}
                className="landing_recent landing_space my-1 min-[615px]:my-3"
              >
                <RowSkeletonContainer />
              </div>
            ))}
      </div>
    </Container>
  );
};

export default Landing;
