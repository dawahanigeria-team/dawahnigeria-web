import React, { useEffect, useState, useCallback, useRef } from "react";
import Container from "../../components/container/Container";
import { VIDEO, VIDEOS } from "../../utils/routes/constants";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import axios from "../../utils/useAxios";
import { BiSolidShareAlt, BiMessageMinus } from "react-icons/bi";
import _ from "lodash";
import comvideo from "../../assets/svg/comment-video.svg";
import sharevideo from "../../assets/svg/share-video.svg";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import Loader from "../../components/UI/loader/loader";
import ShareAudio from "../../components/shareaudio/shareAudio";
import {
  HiOutlineArrowLongLeft,
  HiOutlineArrowLongRight,
} from "react-icons/hi2";
import OthersWidget from "./othersWidget";
import CommentBox from "../../components/comment/comment";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import YouTube from "react-youtube";
import { formatNumber } from "../../components/UI/formatter";
import { FaClosedCaptioning } from "react-icons/fa";
import HeadMeta from "../../components/head-meta";

const VideoPlayer = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const observeEl = useRef();
  const [isEmpty, setIsEmpty] = useState(false);
  const [subdata, setsubdata] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [nextPageLoad, setNextPageLoad] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [audioComment, setaudioComment] = useState();
  const [isShare, setisShare] = useState(false);
  const [height, setHeight] = useState();
  const [isload, setload] = useState(false);
  const [addFav, setaddFav] = useState(false);
  const [isdisabled, setdisabled] = useState(false);
  const [getFavs, setgetfavs] = useState([]);

  useEffect(() => {
    axios
      .get(`/video_listingApi.php?id=${id}&action=singleVideo`)
      .then((res) => {
        setload(true);
        setData(res.data);
      })
      .catch((err) => {});
  }, [id]);

  //similar videos
  useEffect(() => {
    const handleRequest = () => {
      if (isEmpty) return;
      if (page > 1) {
        setNextPageLoad(true);
      }
      axios
        .get(`/video_listingApi.php?page=${page}&action=allVideo`)
        .then((res) => {
          if (page === 1) {
            setLoading(false);
          }
          setNextPageLoad(false);
          if (res.data.length === 0) {
            setIsEmpty(true);
            return;
          }

          setsubdata((prev) =>
            _.uniqBy(
              [...prev, ...res.data.filter((value) => value.id !== id)],
              "id"
            )
          );
        })
        .catch((err) => {});
    };

    handleRequest();
  }, [page]);

  const handleNextAudio = () => {
    const next = subdata.findIndex((value) => value.id === id);

    navigate(`${VIDEOS}${subdata[next + 1].id}`);
  };

  const shareAudio = (e) => {
    e.stopPropagation();
    setisShare(!isShare);
    //setNidValue(nid)
  };

  //////*************handling comment**************** */

  useEffect(() => {
    if (!currentUser?.id) {
      return;
    }

    axios
      .get(
        `/commentApi.php?user_id=${currentUser?.id}&item_id=${parseInt(
          id
        )}&type=video`,
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

  useEffect(() => {
    if (window.innerWidth <= 615) {
      setHeight(220);
    } else {
      setHeight(400);
    }
  }, []);
  const opts = {
    height: height,
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  /////get users favorites
  async function fetchFavorites(addFav, lecid) {
    //setsumofFav(favorites)
    if (!currentUser?.id) return;
    if (addFav || (!addFav && lecid)) {
      await axios
        .get(
          `/leclisting_favorites.php?user_id=${currentUser?.id}&type=video`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
            },
          }
        )
        .then((res) => {})
        .catch((err) => {});
    }
  }
  useEffect(() => {
    fetchFavorites(addFav, id);
  }, [addFav, id]);

  const addToFav = async () => {
    if (!currentUser?.id) {
      toast.error("Login or register to add to favorites");
      navigate("/auth/login");
      return;
    }
    const payload = {
      user_id: currentUser?.id,
      item_id: parseInt(id),
      type: "video",
    };
    await axios
      .post(`/leclisting_favorites.php`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        setdisabled(false);
      })

      .catch((err) => {});
  };

  return (
    <Container>
      <HeadMeta
        title={`${
          data?.title || "Video"
        } on Dawah Nigeria - Home of islamic resources`}
      />
      <div className="w-full boom min-[615px]:px-4 pt-3 pb-20 h-full text-sm min-[615px]:text-[15px]">
        <div className="my-3 max-[615px]:hidden text-sm text-foreground space-x-2 flex items-center">
          <HiOutlineArrowLongLeft
            onClick={() => {
              navigate(-1);
            }}
            className={
              pathname === `${VIDEOS}${id}`
                ? "text-foreground text-[22px]"
                : "text-[22px] text-gray-500 dark:text-gray-300"
            }
          />
          <HiOutlineArrowLongRight
            className={
              pathname === VIDEO
                ? "text-foeground text-[22px]"
                : "text-[22px] text-gray-500 dark:text-gray-300"
            }
          />
          <span className="text-gray-500 dark:text-gray-300">Videos</span>
          <span>/</span> <span></span>
          {data?.title}
        </div>

        <div className="w-full grid grid-cols-1 xl:grid-cols-9 xl:gap-3 ">
          <div className="h-full max-[615px]:h-[220px] bg-secondary   col-span-6">
            <div className="w-full h-[220px] min-[615px]:pb-3 min-[615px]:mb-[0rem] z-[10] max-[615px]:fixed inset-x-0 top-[55px] min-[615px]:h-[400px] min-[615px]:rounded-md">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(-1);
                }}
                className="cursor-pointer absolute min-[615px]:hidden top-8 left-2 w-fit h-fit"
              >
                <BsFillArrowLeftCircleFill className="text-[30px] text-[#bbff4e]" />
              </div>
              {isload ? (
                <YouTube
                  videoId={`${data?.youtubekey}`}
                  onEnd={() => handleNextAudio()}
                  onError={(e) => handleNextAudio()}
                  opts={opts}
                />
              ) : (
                <img
                  className="w-full h-full"
                  src="https://res.cloudinary.com/dkdrbjfdt/image/upload/v1709550293/lazysong_abcewr.jpg"
                  alt=""
                />
              )}
            </div>

            <div className="p-2 hidden xl:block  w-full bg-secondary text-foreground space-y-2">
              <div className="min-[615px]:text-lg text-[15px] font-semibold capitalize ">
                {data?.title || ""}
              </div>
              <div className="max-[615px]:text-[13px] text-sm">
                <span className="mr-1">{`${data?.views || 0} views.`}</span>
                <span>{data?.author || "Lecturer"}</span>
              </div>
            </div>

            <div className="w-full xl:flex hidden mt-2 text-zinc-600 dark:text-gray-400 pr-6  min-[615px]:text-sm  space-x-20 justify-end items-center">
              <button
                onClick={() => {
                  addToFav();
                }}
                disabled={isdisabled}
                className="flex items-center cursor-pointer space-x-2"
              >
                <MdOutlineFavoriteBorder className="text-[22px]" />
                <span>{formatNumber(data?.favourites || 0)}</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    shareAudio(e);
                  }}
                  className="text-zinc-600 dark:text-gray-400"
                >
                  <BiSolidShareAlt className="text-[22px]" />
                </button>
                <span>{formatNumber(data?.share || 0)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-zinc-600 dark:text-gray-400">
                  <BiMessageMinus className="text-[22px]" />
                </div>
                <span>{formatNumber(data?.comments || 0)}</span>
              </div>
            </div>

            <div className="xl:block hidden">
              <CommentBox
                id={parseInt(id)}
                audioComment={audioComment}
                type={"video"}
              />
            </div>
          </div>

          <div className="px-3 pt-3 xl:pt-0 text-foreground max-[1238px]:space-y-4   min-[615px]:col-span-3">
            <div className="p-2 block xl:hidden  w-full bg-secondary text-foreground space-y-2">
              <div className="min-[615px]:text-lg text-[15px] font-semibold capitalize ">
                {data?.title || ""}
              </div>
              <div className="max-[615px]:text-[13px] text-sm">
                <span className="mr-1">{`${formatNumber(
                  data?.views || 0
                )} views.`}</span>
                <span>{data?.author || "Lecturer"}</span>
              </div>
            </div>

            <div className="w-full xl:hidden flex text-zinc-600 dark:text-gray-400 text-[12px] min-[615px]:text-sm space-x-20 min-[615px]:pl-6 min-[615px]:justify-start justify-center items-center">
              <button
                onClick={() => {
                  addToFav();
                }}
                disabled={isdisabled}
                className="flex items-center cursor-pointer space-x-2"
              >
                <MdOutlineFavoriteBorder className=" text-[22px]" />
                <span>{formatNumber(data?.favourites || 0)}</span>
              </button>

              <div className="flex items-center space-x-2">
                <div
                  onClick={(e) => {
                    shareAudio(e);
                  }}
                  className="text-zinc-600 dark:text-gray-400"
                >
                  <BiSolidShareAlt className="text-[22px]" />
                </div>
                <span>{formatNumber(data?.share || 0)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-zinc-600 dark:text-gray-400">
                  <BiMessageMinus className="text-[22px]" />
                </div>
                <span>{formatNumber(data?.comments || 0)}</span>
              </div>
            </div>
            <div className="text-lg font-medium xl:mb-4">You may also like</div>
            <div className="flex flex-col space-y-3 min-[615px]:space-y-3 w-full">
              {loading && (
                <div className="w-full flex items-center justify-center h-[100px]">
                  <Loader />
                </div>
              )}
              {!loading && (
                <div className="video_widget">
                  {subdata?.map(({ images, id, author, views, title }, idx) => {
                    return (
                      <Link
                        to={`${VIDEOS}${id}`}
                        className="min-[615px]:mb-3"
                        key={idx}
                      >
                        <OthersWidget
                          title={title}
                          author={author}
                          views={views}
                          images={images}
                        />
                      </Link>
                    );
                  })}
                </div>
              )}
              <button
                onClick={() => {
                  if (isEmpty) return;
                  setPage(page + 1);
                }}
                className="w-full min-[615px]:w-[50%] flex justify-center items-center py-2 border border-color text-color rounded-lg"
              >
                {nextPageLoad ? (
                  <span className="rounded-full w-4 h-4 border-l border-r border-color animate-spin"></span>
                ) : (
                  <span>Show more</span>
                )}
              </button>
            </div>

            {/** */}
          </div>
        </div>

        <div className="xl:hidden px-3 block">
          <CommentBox
            id={parseInt(id)}
            audioComment={audioComment}
            type={"video"}
          />
        </div>
      </div>
      <div className={isShare ? "block" : "hidden"}>
        <ShareAudio
          isShare={isShare}
          setisShare={setisShare}
          nid={parseInt(id)}
          type={"video"}
        />
      </div>
    </Container>
  );
};

export default VideoPlayer;
