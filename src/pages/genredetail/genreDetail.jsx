import React from "react";
import "./genredetail.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Container from "../../components/container/Container";
import { MdNavigateBefore } from "react-icons/md";
import { useQueryGetRequest } from "../../hooks/getqueries";
import { VscArrowLeft, VscArrowRight } from "react-icons/vsc";

import GroupWidget from "../../components/groupWidget/GroupWidget";

import { genresApi } from "../../services";

import HeadMeta from "../../components/head-meta";
import { useSelector } from "react-redux";


const GenreDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryParam = { id };
  const {theme} = useSelector((state) => state.user)

  const { querieddata } = useQueryGetRequest(
    "genre-details",
    queryParam,
    genresApi.getCategoryDetails
  );

 
  //i/genre_api.php?cat_id=40622
  return (
    <Container>
      <HeadMeta
        title={`${
          querieddata?.category_details && querieddata?.category_details[0]?.name || ""
        } - Islamic resources on Dawah Nigeria`}
      />
      <div className="genredet_wrapper max-[615px]:pt-[10%]">
        <div className="w-full min-[615px]:h-[700px] h-[260px] max-[615px]:brightness-[20%] absolute ">
          <img
            className="w-full h-full bg-cover "
            src={
              querieddata?.category_details && querieddata?.category_details[0]?.img ||
              "https://imagetolink.com/ib/HSWijBu8Pn.jpeg"
            }
            alt=""
          />
        {theme === "dark" ?  <div className="gradientgenre"></div> : <div className="gradientgenre_light"></div> }
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
              {querieddata?.category_details && querieddata?.category_details[0]?.name}
            </div>

            <div className="w-full h-fit m-auto absolute inset-0 flex items-center justify-center">
              <span className="text-lg min-[615px]:text-3xl font-semibold text-white">
                {querieddata?.category_details && querieddata?.category_details[0]?.name}
              </span>
            </div>
          </div>
        </div>

        <div className="genre_items w-full min-[615px]:relative pb-10 min-[615px]:space-y-4 space-y-3 px-4">
         
        <GroupWidget
            data={querieddata?.audio}
            heading="Lectures"
            type={"lectures"}
            nav1={{ title: "Genres" }}
          />
          <GroupWidget
            data={querieddata?.rp}
            heading="Lecturers"
            type={"lecturer"}
            nav1={{ title: "Genres" }}
          />

          <GroupWidget
            data={querieddata?.album}
            heading="Albums"
            type={"album"}
            nav1={{ title: "Genres" }}
          />
        
        </div>
      </div>
    </Container>
  );
};

export default GenreDetail;
