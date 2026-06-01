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
import { IMAGE_PLACEHOLDERS } from "../../utils/imagePlaceholders";
import SortToggle from "../../components/UI/sortToggle/SortToggle";
import { useSortParam } from "../../hooks/common/useSortParam.hook";

const GenreDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sort, setSort] = useSortParam();
  const queryParam = { id, sort };
  const { theme } = useSelector((state) => state.user);

  const { data: categoryResponse } = useQueryGetRequest(
    "genre-details",
    queryParam,
    genresApi.getCategoryDetails
  );
  const categoryName = categoryResponse?.category_details?.[0]?.name || "";
  const categoryImage =
    categoryResponse?.category_details?.[0]?.img || IMAGE_PLACEHOLDERS.lecture;

  //i/genre_api.php?cat_id=40622
  return (
    <Container>
      <HeadMeta title={`${categoryName} - Islamic resources on Dawah Nigeria`} />
      <div className="genredet_wrapper max-[615px]:pt-[10%]">
        <div className="w-full min-[615px]:h-[700px] h-[260px] max-[615px]:brightness-[20%] absolute ">
          <img
            className="w-full h-full bg-cover "
            src={categoryImage}
            alt=""
          />
          {theme === "dark" ? (
            <div className="gradientgenre"></div>
          ) : (
            <div className="gradientgenre_light"></div>
          )}
        </div>
        <div className="w-full relative top-0 inset-x-0 h-[260px] min-[615px]:h-[350px]">
          <div className="w-full absolute top-0 inset-x-0 h-full">
            <div
              onClick={handleBack}
              className="min-[615px]:hidden absolute z-[1] top-4 left-4"
            >
              <MdNavigateBefore className="text-[28px] text-white" />
            </div>
            <div className="desktop_heading absolute z-[1] cursor-pointer top-4 left-4">
              <VscArrowLeft
                onClick={handleBack}
                className={
                  pathname === `/dawahcast/categories/${id}` ||
                  pathname === `/dawahcast/genres/${id}`
                    ? "arrows white"
                    : "arrows grey"
                }
              />
              <VscArrowRight
                className={pathname === "/" ? "arrows white" : "arrows grey"}
              />
              <span className="grey">{"Category"}</span>/ <span></span>
              {categoryName}
            </div>

            <div className="w-full h-fit m-auto absolute inset-0 flex items-center justify-center">
              <span className="text-lg min-[615px]:text-3xl font-semibold text-white">
                {categoryName}
              </span>
            </div>
          </div>
        </div>

        <div className="genre_items w-full min-[615px]:relative pb-10 min-[615px]:space-y-4 space-y-3 px-4">
          {categoryResponse?.audio?.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-color">Lectures</span>
              <SortToggle sort={sort} onChange={setSort} />
            </div>
          )}
          <GroupWidget
            data={categoryResponse?.audio}
            heading="Lectures"
            type={"lectures"}
            nav1={{ title: "Categories" }}
          />
          <GroupWidget
            data={categoryResponse?.rp}
            heading="Lecturers"
            type={"lecturer"}
            nav1={{ title: "Categories" }}
          />

          <GroupWidget
            data={categoryResponse?.album}
            heading="Albums"
            type={"album"}
            nav1={{ title: "Categories" }}
          />
        </div>
      </div>
    </Container>
  );
};

export default GenreDetail;
