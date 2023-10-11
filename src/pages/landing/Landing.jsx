import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./landing.scss";
import Container from "../../components/container/Container";
import GroupWidget from "../../components/groupWidget/GroupWidget";
import axios from "../../utils/useAxios";
import Slider from "react-slick";
import bchart from "../../assets/svg/boom-chart.svg";
import blecturer from "../../assets/svg/boom-lecturer.svg";
import bplaylist from "../../assets/svg/boom-playlist.svg";
import btrending from "../../assets/svg/boom-trending.svg";
import bnew from "../../assets/svg/boom-new.svg";
import bgenre from "../../assets/svg/boom-genre.svg";
import { BsFillPlayBtnFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import useAxios from "axios";
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
} from "../../utils/routes/constants";
import HeadMeta from "../../components/head-meta";
import RowSkeletonContainer from "../../components/skeletion/skeleton.container";
const Landing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [recent, setRecent] = useState([]);
  const [curPlay, setcurPlay] = useState([]);
  const [isSpecialFeatLoading, setIsSpecialFeatLoading] = useState(false);
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

  const fetSpecialFeat = () => {
    setIsSpecialFeatLoading(true);
    useAxios
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
        setIsSpecialFeatLoading(false);
        const specialFeatures = res.data?.flatMap((val) => [
          { name: val.name, more: val.more },
        ]);
        setSpecialFeat(specialFeatures);
      })
      .catch((err) => {
        setIsSpecialFeatLoading(false);

        console.log(err);
      });
  };

  let page = 1;
  useEffect(() => {
    function fetchData() {
      setisrecent(true);
      if (currentUser?.id) {
        axios
          .get(`/recentApi.php?user_id=${currentUser?.id}&action=get_recent`)
          .then((res) => {
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
        axios
          .get(`/leclisting_lang.php?langid=6&page=${page}`)
          .then((res) => {
            setisrecent(false);
            setRecent(res.data?.slice(0, 10));
            // //console.log("trending: ", res.data);
          })
          .catch((err) => {
            setisrecent(false);
            //console.log(err);
          });
      }
    }

    fetSpecialFeat();
    fetchData();
  }, []);

  return (
    <Container>
      <HeadMeta title="DawahNigeria | Home" />
      <div className="landing_wrapper px-[2%] max-[615px]:py-[5%] py-[8%] min-[690px]:py-[2%]">
        {images.length > 1 ? (
          <>
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
              <LandingOptions
                text={"Lecturers"}
                img={blecturer}
                link={LECTURERS}
              />
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

        {recent && !isrecent ? (
          <div className="landing_recent landing_space my-1 min-[615px]:my-3">
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
        ) : (
          <div className="landing_recent landing_space my-1 min-[615px]:my-3">
            <RowSkeletonContainer />
          </div>
        )}

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
        {isSpecialFeatLoading &&
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
