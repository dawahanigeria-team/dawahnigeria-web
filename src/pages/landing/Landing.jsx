import React, { useMemo } from "react";
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
import CarouselSkeleton from "../../components/skeletion/carousel.skeleton";
import {
  CATEGORIES,
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
import { useMediaQuery } from "../../hooks/common/useMediaQuery.hook";
import { MEDIA_QUERIES } from "../../utils/breakpoints";

const MOBILE_CAROUSEL_SETTINGS = {
  dots: true,
  infinite: true,
  autoplay: true,
  fade: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: false,
  nextArrow: false,
  lazyLoad: "ondemand",
};

const OPTIONS_SLIDER_SETTINGS = {
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

const SKELETON_COUNT = 4;

const Landing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const id = currentUser?.id;
  const page = 1;
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);

  const [sliders, recentlyPosted, specialFeatures, recentlyviewed] =
    useLandingPageHook(id, page);

  // Extract data from the new API response structure
  const recentlyViewedData = recentlyviewed?.data?.data;
  const isrecent = recentlyviewed?.data?.isRecent ?? false;
  const curPlay = recentlyviewed?.data?.curPlay ?? [];

  const specialFeat = useMemo(() => {
    if (!specialFeatures?.data || !Array.isArray(specialFeatures.data)) {
      return [];
    }
    return specialFeatures.data.map((val) => ({ name: val.name, more: val.more }));
  }, [specialFeatures?.data]);

  const hasSliderData = sliders?.data && Array.isArray(sliders.data) && sliders.data.length > 1;

  return (
    <Container>
      <HeadMeta title="Welcome to Dawah Nigeria - Home of Islamic resources" />
      <div className="landing_wrapper px-[2%] mobile:py-[5%] py-[8%] min-[690px]:py-[2%]">
        {hasSliderData ? (
          <>
            {/* Desktop Carousel - only render on desktop */}
            {!isMobile && (
              <div className="carousel h-[250px] min-[950px]:h-[250px] min-[1050px]:h-[250px] min-[1283px]:h-[300px]">
                <MyCarousel images={sliders.data} />
              </div>
            )}

            {/* Mobile Carousel - only render on mobile */}
            {isMobile && (
              <>
                <Slider className="landing_carousel landing_space" {...MOBILE_CAROUSEL_SETTINGS}>
                  {sliders.data.map((image, index) => (
                    <div key={image} className="landing_carousel_img">
                      <MobileImageWidget image={image} />
                    </div>
                  ))}
                </Slider>
                <h2 className="landing_browse_heading text-color">Browse</h2>
                <Slider className="landing_options" {...OPTIONS_SLIDER_SETTINGS}>
                  <LandingOptions text={"Ramadan"} img={bplaylist} link={RAMADAN} />
                  <LandingOptions text={"Charts"} img={bchart} link={CHARTS} />
                  <LandingOptions text={"Lecturers"} img={blecturer} link={LECTURERS} />
                  <LandingOptions text={"Quran"} img={quranIcon} link={QURAN} />
                  <LandingOptions text={"Playlists"} img={bplaylist} link={PLAY} />
                  <LandingOptions text={"Video"} icon={<BsFillPlayBtnFill />} link={VIDEO} />
                  <LandingOptions text={"Categories"} img={bgenre} link={CATEGORIES} />
                  <LandingOptions text={"Trending"} img={btrending} link={TRENDING} />
                  <LandingOptions text={"New"} img={bnew} link={NEW} />
                </Slider>
              </>
            )}
          </>
        ) : (
          <CarouselSkeleton />
        )}

        {recentlyPosted?.isSuccess && Array.isArray(recentlyPosted?.data) && (
          <div className="landing_recent landing_space my-1 mobile-up:my-3">
            <GroupWidget
              data={recentlyPosted.data.slice(0, 10)}
              heading="Recently Posted"
              type={"lectures"}
              endpoint_url={"/leclisting_recent.php?&action=get_recent_audio&page="}
              currentPage={page}
              isrecentpost={true}
              nav1={{ title: "Home", link: HOME }}
            />
          </div>
        )}

        {recentlyviewed?.isSuccess && Array.isArray(recentlyViewedData) && (
          <div className="landing_recent landing_space my-1 mobile-up:my-3">
            <GroupWidget
              data={recentlyViewedData}
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

        {specialFeat
          .filter(({ more }) => Array.isArray(more) && more.length > 0)
          .map(({ name, more }) => (
            <div
              key={name}
              className="landing_tafsir landing_space my-1 mobile-up:my-3"
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

        {/* Reduced skeleton count from 10 to 4 */}
        {specialFeat.length === 0 &&
          specialFeatures?.isLoading &&
          Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <div
              key={i}
              className="landing_recent landing_space my-1 mobile-up:my-3"
            >
              <RowSkeletonContainer />
            </div>
          ))}
      </div>
    </Container>
  );
};

export default Landing;
