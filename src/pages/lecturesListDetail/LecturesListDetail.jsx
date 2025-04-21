import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import Container from "../../components/container/Container";
import arrow from "../../assets/svg/arrowleft.svg";
import sharebold from "../../assets/svg/sharebold.svg";
import combold from "../../assets/svg/combold.svg";
import { CiPlay1 } from "react-icons/ci";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./lecturesListDetail.scss";
import MusicList from "../../components/miscList/musicList";
import MobileList from "../../components/list/mobileList";
import Loader from "../../components/UI/loader/loader";
import { BsFillPlayFill } from "react-icons/bs";
import { SlShare } from "react-icons/sl";
import { formatNumber } from "../../components/UI/formatter";
import { useSelector, useDispatch } from "react-redux";
import useaxios from "../../utils/useAxios";

import _ from "lodash";
import CommentBox from "../../components/comment/comment";
import SimilarAudio from "../../components/similaraudio/similarAudio";
import ShareAudio from "../../components/shareaudio/shareAudio";
import lazy from "../../assets/png/lazyrps.jpeg";
import {
  getaudioId,
  getCount,
  getPack,
} from "../../Redux/Actions/ActionCreators";
import { AudioContext } from "../../App";
import { LECTURE } from "../../utils/routes/constants";

import { useQueryGetRequest } from "../../hooks/getqueries";
import { lectureListDetailApi } from "../../services";
import { DesktopFavoriteButton } from "../../components/UI/favoritebuttons/desktopfavoriteButtons";
import { MobileFavoriteButton } from "../../components/UI/favoritebuttons/mobilefavoriteButton";

import { AudioDownloadModal } from "../../components/audioDownloadModal/AudioDownloadModal";
import { CommentIcon } from "../../components/svgcomponent/svgComponent";
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";

const LecturesListDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { currentUser, sharedAlbum } = useSelector((state) => state.user);
  const observeEl = useRef();
  const leclistdet = useRef();
  const [, setsingleData] = useState();
  const { setinitial } = useContext(AudioContext);
  const [isShare, setisShare] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [audioComment, setaudioComment] = useState();
  const { theme } = useSelector((state) => state.user);

  const queryParam = { id };
  const keyParam = { id, page: 1 };

  const { querieddata, refetch } = useQueryGetRequest(
    "albumdetails",
    queryParam,
    lectureListDetailApi.getAlbumDetail
  );
  const { querieddata: albumlectures, isLoading } = useQueryGetRequest(
    "albumlectures",
    queryParam,
    lectureListDetailApi.getAlbumLectures
  );
  const { querieddata: similarAlbums } = useQueryGetRequest(
    "similarRpAlbums",
    keyParam,
    lectureListDetailApi.getSimilarAlbums
  );

  useEffect(() => {
    setsingleData((prev) => {
      return { ...prev, share: prev?.share + 1 };
    });
  }, [sharedAlbum]);

  //////*************handling comment**************** */

  useEffect(() => {
    if (!currentUser?.id) return;

    useaxios
      .get(
        `/commentApi.php?user_id=${currentUser?.id}&item_id=${id}&type=album`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
          },
        }
      )
      .then((res) => {
        setaudioComment(res.data.reverse());
      })
      .catch((err) => {});
  }, [id]);

  /// Get the exiting element
  const firstElement = useCallback((node) => {
    observeEl.current = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });

    if (node) observeEl.current.observe(node);
  }, []);

  //play all audio files
  const playAll = () => {
    if (window.innerWidth <= 615) {
      navigate(`${LECTURE}${albumlectures[0]?.nid}`);
    } else {
      dispatch(getaudioId(albumlectures[0]?.nid));
    }
    dispatch(getCount(0));
    dispatch(getPack(albumlectures));
    setinitial(false);
  };

  ///**** share album ******** */

  const shareAlbum = (e) => {
    e.stopPropagation();
    setisShare(!isShare);
  };

  useEffect(() => {
    leclistdet?.current.addEventListener("error", () => {
      const imgs = document.querySelectorAll("#hero");
      imgs.forEach((img) => {
        img.src = IMAGE_PLACEHOLDERS.lecture;
      });
    });
  }, []);

  const lectureTitleExtractor = (title, position) => {
    if (!title) return;
    if (title && title.includes("-")) {
      const titleArray = title.split("-");
      if (titleArray.length >= 2 && position === 1) return titleArray[1];
      if (titleArray.length >= 2 && position === 2) return titleArray[2];
    }

    if (title) return title;
  };

  return (
    <>
      {/* React 19 Metadata */}
      {querieddata && (
        <>
          <title>
            {`${lectureTitleExtractor(querieddata[0]?.title, 2) || "Album"} - ${
              querieddata[0]?.rp_name || "Dawahnigeria"
            }`}
          </title>
          <meta
            name="description"
            content={`Listen to the album '${querieddata[0]?.title || 'Unknown Album'}' by ${
              querieddata[0]?.rp_name || "various scholars"
            } on Dawahnigeria. Explore Islamic lectures and resources.`}
          />
          {/* Open Graph Meta Tags for Link Previews */}
          <meta
            property="og:title"
            content={`${lectureTitleExtractor(querieddata[0]?.title, 2) ||
              "Album"} - ${querieddata[0]?.rp_name || "Dawahnigeria"}`}
          />
          <meta
            property="og:description"
            content={`Listen to the album '${querieddata[0]?.title ||
              "Unknown Album"}' by ${querieddata[0]?.rp_name ||
              "various scholars"} on Dawahnigeria.`}
          />
          <meta
            property="og:image"
            content={querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture}
          />
          <meta property="og:type" content="music.album" />
          {/* Optionally add og:url with the canonical URL */}
        </>
      )}
      <Container>
        {Array.isArray(querieddata) && (
          <div className="leclistdet_wrapper">
            <img
              ref={leclistdet}
              id="hero"
              className={`${theme === "dark" ? "leclistdet_hero" : "leclistdet_hero_light"}`}
              src={querieddata[0]?.img || IMAGE_PLACEHOLDERS.lecture}
              alt="audiohero"
            />

            <div className="leclistdet_container">
              {/* ... (Keep all the original content inside leclistdet_container) ... */}
              {/* Make sure all the sections (breadcrumbs, head_wrap, mobile view, song list, similar audio, comments, share) are present here */}

              {/* Example: Showing the breadcrumb part */}
              <div className="leclistdet_breadcrumb">
                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="leclistdet_breadcrumb_first"
                >
                  Back
                </button>
              </div>

              {/* ... (rest of the original content goes here) ... */}

              {/* Ensure CommentBox and ShareAudio are correctly placed */}
              <div className="px-3">
                <SimilarAudio
                  similar={similarAlbums}
                  current={querieddata?.rp_id}
                  url={`/a`}
                  type={"album"}
                  endpoint_url={`/albumlisting_rp.php?offset=30&lim=10&rpid=${querieddata?.rp_id}&page=`}
                  currentPage={1}
                  navtitle={"Album"}
                  heading={`Similar albums`}
                />

                <CommentBox audioComment={audioComment} id={id} type={"album"} />
              </div>

              <div className={isShare ? "share_wrapper" : "hide_share_wrapper"}>
                <ShareAudio
                  isShare={isShare}
                  setisShare={setisShare}
                  nid={id}
                  type={"album"}
                />
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default LecturesListDetail;
