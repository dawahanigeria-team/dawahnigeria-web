import React, { useMemo, useState } from "react";
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
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterChips from "../../components/filterChips/FilterChips";
import {
  ALL_LANGUAGES_ID,
  DEFAULT_LANGUAGE_ID,
  HOME_LANGUAGES,
  readStoredLanguage,
  storeLanguage,
} from "../../utils/languages";
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
  LEADERBOARD,
  LIBRARY,
} from "../../utils/routes/constants";
import HeadMeta from "../../components/head-meta";
import { useLandingPageHook } from "../../hooks/landing";
import RowSkeletonContainer from "../../components/skeletion/skeleton.container";
import { useMediaQuery } from "../../hooks/common/useMediaQuery.hook";
import { MEDIA_QUERIES } from "../../utils/breakpoints";
import { EVENTS, trackEvent } from "../../utils/posthog";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { trendingApi } from "../../services/trending.service";

const MOBILE_CAROUSEL_SETTINGS = {
  dots: true,
  infinite: true,
  autoplay: false,
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
  const { currentUser, token, refreshToken } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const id = currentUser?.id;
  const page = 1;
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);
  const hasAuthSession = Boolean(
    currentUser?.id ||
    (typeof token === "string" && token.trim()) ||
    (typeof refreshToken === "string" && refreshToken.trim())
  );

  // Language filter for the trending feed. Seeded from the URL so a filtered
  // home can be shared or reloaded, then from the last choice, then English.
  // Applied server-side (see trendingApi.getTrendings) rather than filtering
  // the loaded page, which would only reorder the handful of rows on screen.
  const [searchParams, setSearchParams] = useSearchParams();
  const [languageId, setLanguageId] = useState(() => {
    const fromUrl = searchParams.get("lang");
    if (fromUrl === "all") return ALL_LANGUAGES_ID;
    if (fromUrl !== null && fromUrl !== "") {
      const parsed = Number(fromUrl);
      if (HOME_LANGUAGES.some((l) => l.id === parsed)) return parsed;
    }
    const stored = readStoredLanguage();
    return stored === undefined ? DEFAULT_LANGUAGE_ID : stored;
  });

  const handleLanguageChange = (nextId) => {
    setLanguageId(nextId);
    storeLanguage(nextId);
    const next = new URLSearchParams(searchParams);
    next.set("lang", nextId === ALL_LANGUAGES_ID ? "all" : String(nextId));
    setSearchParams(next, { replace: true });
  };

  const activeLanguageName =
    HOME_LANGUAGES.find((l) => l.id === languageId)?.name ?? "";

  const [sliders, recentlyPosted, specialFeatures, recentlyviewed] =
    useLandingPageHook(id, page);
  const { querieddata: trendingLectures, isLoading: trendingLoading } =
    useQueryGetRequest(
      "home-trending",
      { page: 1, langid: languageId },
      trendingApi.getTrendings
    );

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

  const handleLeaderboardCtaClick = () => {
    trackEvent(EVENTS.LEADERBOARD_CTA_CLICKED, {
      source: "landing_mobile",
      is_authenticated: hasAuthSession,
      has_auth_session: hasAuthSession,
      target_path: LEADERBOARD,
    });

    navigate(LEADERBOARD);
  };

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
                      <MobileImageWidget image={image} priority={index === 0} />
                    </div>
                  ))}
                </Slider>
                <h2 className="landing_browse_heading text-color">Browse</h2>
                <Slider className="landing_options" {...OPTIONS_SLIDER_SETTINGS}>
                  <LandingOptions text={"Library"} img={bplaylist} link={LIBRARY} />
                  <LandingOptions text={"Charts"} img={bchart} link={CHARTS} />
                  <LandingOptions text={"Lecturers"} img={blecturer} link={LECTURERS} />
                  <LandingOptions text={"Quran"} img={quranIcon} link={QURAN} />
                  <LandingOptions text={"Playlists"} img={bplaylist} link={PLAY} />
                  <LandingOptions text={"Video"} icon={<BsFillPlayBtnFill />} link={VIDEO} />
                  <LandingOptions text={"Categories"} img={bgenre} link={CATEGORIES} />
                  <LandingOptions text={"Trending"} img={btrending} link={TRENDING} />
                  <LandingOptions text={"New"} img={bnew} link={NEW} />
                </Slider>

                <section className="landing_mobile_leaderboard_cta" aria-label="Listening leaderboard call to action">
                  <p className="landing_mobile_leaderboard_badge">Community listening</p>
                  <h2>Check today&apos;s leaderboard</h2>
                  <p>
                    Track your listening sessions and climb the daily ranking.
                  </p>
                  <button
                    type="button"
                    className="landing_mobile_leaderboard_button"
                    onClick={handleLeaderboardCtaClick}
                  >
                    View leaderboard
                  </button>
                </section>
              </>
            )}
          </>
        ) : (
          <CarouselSkeleton />
        )}

        <div className="landing_space home_language_filter">
          <FilterChips
            options={HOME_LANGUAGES}
            value={languageId}
            onChange={handleLanguageChange}
            label="Filter lectures by language"
          />
        </div>

        {Array.isArray(trendingLectures) && trendingLectures.length > 0 && (
          <div className="landing_recent landing_space my-1 mobile-up:my-3 home_trending_first">
            <GroupWidget
              data={trendingLectures.slice(0, 10)}
              heading={
                languageId === ALL_LANGUAGES_ID
                  ? "Trending Now"
                  : `Trending in ${activeLanguageName}`
              }
              type="lectures"
              endpoint_url={
                languageId === ALL_LANGUAGES_ID
                  ? "/popular_lec_api.php?page="
                  : `/popular_lec_api.php?langid=${languageId}&page=`
              }
              currentPage={page}
              nav1={{ title: "Home", link: HOME }}
            />
          </div>
        )}

        {trendingLoading && (
          <div className="landing_recent landing_space my-1 mobile-up:my-3">
            <RowSkeletonContainer />
          </div>
        )}

        {/* A language with nothing trending would otherwise make the whole
            section disappear, which reads as a broken page right after the
            user taps a chip. Say what happened and offer the way back. */}
        {!trendingLoading &&
          Array.isArray(trendingLectures) &&
          trendingLectures.length === 0 && (
            <div className="landing_recent landing_space my-1 mobile-up:my-3">
              <p className="home_empty_language" aria-live="polite">
                No lectures trending in {activeLanguageName} right now.{" "}
                <button
                  type="button"
                  className="home_empty_language_reset"
                  onClick={() => handleLanguageChange(ALL_LANGUAGES_ID)}
                >
                  Show all languages
                </button>
              </p>
            </div>
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
