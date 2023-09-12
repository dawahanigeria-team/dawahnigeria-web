import React, { useEffect, useState } from "react";
import axios from "../../utils/useAxios";
import "./genredetail.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Container from "../../components/container/Container";
import { MdNavigateBefore } from "react-icons/md";

import { VscArrowLeft, VscArrowRight } from "react-icons/vsc";

import GroupWidget from "../../components/groupWidget/GroupWidget";
const GenreDetail = () => {
  const { id } = useParams();
  const [lectures, setLectures] = useState([]);
  const [lectalbum, setlectalbum] = useState([]);
  const [catDetail, setcatDetail] = useState([]);
  const [artist, setartist] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    axios
      .get(`/genre_api.php?cat_id=${id}`)
      .then((res) => {
        //console.log("genre", res.data);
        const { audio, album, rp, category_details } = res.data;

        setlectalbum(album);
        setartist(rp);
        setcatDetail(category_details);
        ////console.log(category_details)
        setLectures(audio);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //i/genre_api.php?cat_id=40622
  return (
    <Container>
      <div className="genredet_wrapper">
        <div className="w-full min-[615px]:h-[700px] h-[260px] max-[615px]:brightness-[20%] absolute ">
          <img
            className="w-full h-full bg-cover "
            src={
              catDetail[0]?.img || "https://imagetolink.com/ib/HSWijBu8Pn.jpeg"
            }
            alt=""
          />
          <div className="gradientgenre"></div>
        </div>
        <div className="w-full relative top-0 inset-x-0 h-[260px] min-[615px]:h-[350px]">
          <div className="w-full absolute top-0 inset-x-0 h-full">
            <div
              onClick={() => {
                navigate(-1);
              }}
              className="min-[615px]:hidden absolute z-[1] top-4 left-4"
            >
              <MdNavigateBefore className="text-[28px] text-white" />
            </div>
            <div className="desktop_heading absolute z-[1] cursor-pointer top-4 left-4">
              <VscArrowLeft
                onClick={() => {
                  navigate(-1);
                }}
                className={
                  pathname === `/genres/${id}` ? "arrows white" : "arrows grey"
                }
              />
              <VscArrowRight
                className={pathname === "/" ? "arrows white" : "arrows grey"}
              />
              <span className="grey">{"Genre"}</span>/ <span></span>
              {catDetail[0]?.name}
            </div>

            <div className="w-full h-fit m-auto absolute inset-0 flex items-center justify-center">
              <span className="text-lg min-[615px]:text-3xl font-semibold text-white">
                {catDetail[0]?.name}
              </span>
            </div>
          </div>
        </div>

        <div className="genre_items w-full min-[615px]:relative pb-10 min-[615px]:space-y-4 space-y-3 px-4">
          <GroupWidget
            data={artist}
            heading="Lecturers"
            type={"lecturer"}
            nav1={{ title: "Genres" }}
          />

          <GroupWidget
            data={lectalbum}
            heading="Albums"
            type={"album"}
            nav1={{ title: "Genres" }}
          />
          <GroupWidget
            data={lectures}
            heading="Lectures"
            type={"lectures"}
            nav1={{ title: "Genres" }}
          />
        </div>
      </div>
    </Container>
  );
};

export default GenreDetail;
