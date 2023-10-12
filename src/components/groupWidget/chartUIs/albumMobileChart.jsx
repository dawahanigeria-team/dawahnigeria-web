import React from "react";
import { Link } from "react-router-dom";
import LectChartWidget from "./chartWidgets/lectChartWidget";
import { ALBUMS } from "../../../utils/routes/constants";
const AlbumMobileChart = ({ data }) => {
  return (
    <div>
      <div className="w-[95%] mx-auto">
        <div className="top3 grid grid-cols-3 items-center gap-10  ">
          <Link
            to={`${ALBUMS}${data[1]?.id || data[1]?.nid}`}
            className="w-full h-full flex flex-col space-y-3 pt-[5px]  overflow-hidden text-white"
          >
            <div className="w-full relative h-[90px] rounded-md">
              <img
                className="rounded-md w-full h-full"
                src={
                  data[1]?.alb_thumbnail ||
                  data[1]?.img ||
                  data[1]?.lec_img ||
                  "https://imagetolink.com/ib/TnDGh8F6J0.jpeg"
                }
                alt=""
              />

              <div className="w-full h-[20px]   text-[12px] inset-x-0 absolute bottom-[-5px] flex items-center justify-center">
                <span className="w-[20px] h-[20px]  rounded-full bg-[#96734a] flex items-center justify-center">
                  {" "}
                  <span className="">2</span>
                </span>
              </div>
            </div>
            <div className="overflow-hidden text-[13px] w-[95px] text-ellipsis whitespace-nowrap">
              {data[1]?.name}
            </div>
          </Link>

          <Link
            to={`${ALBUMS}${data[0]?.id || data[0]?.nid}`}
            className="w-[105%] h-full flex flex-col space-y-3 overflow-hidden text-white"
          >
            <div className="w-full relative h-[100px] rounded-md">
              <img
                className="rounded-md w-full h-full"
                src={
                  data[0]?.alb_thumbnail ||
                  data[0]?.img ||
                  data[0]?.lec_img ||
                  "https://imagetolink.com/ib/TnDGh8F6J0.jpeg"
                }
                alt=""
              />
              <div className="w-full h-[20px]   text-[12px] inset-x-0 absolute bottom-[-5px] flex items-center justify-center">
                <span className="w-[20px] h-[20px] rounded-full bg-[#76a8d7] flex items-center justify-center">
                  {" "}
                  <span className="">1</span>
                </span>
              </div>
            </div>
            <div className="overflow-hidden w-[85px] text-[13px] text-ellipsis whitespace-nowrap">
              {data[0]?.name}
            </div>
          </Link>
          <Link
            to={`${ALBUMS}${data[2]?.id || data[2]?.nid}`}
            className="w-full h-full flex flex-col space-y-3 pt-[5px] overflow-hidden text-white"
          >
            <div className="w-full relative h-[80px] rounded-md">
              <img
                className="rounded-md w-full h-full"
                src={
                  data[2]?.alb_thumbnail ||
                  data[2]?.img ||
                  data[2]?.lec_img ||
                  "https://imagetolink.com/ib/TnDGh8F6J0.jpeg"
                }
                alt=""
              />

              <div className="w-full h-[20px]   text-[12px] inset-x-0 absolute bottom-[-5px] flex items-center justify-center">
                <span className="w-[20px] h-[20px] rounded-full bg-[#ffa736] flex items-center justify-center">
                  {" "}
                  <span className="">3</span>
                </span>
              </div>
            </div>
            <div className="overflow-hidden w-[95px] text-[13px] text-ellipsis whitespace-nowrap">
              {data[2]?.mp3_title}
            </div>
          </Link>
        </div>
      </div>

      <div className="flex flex-col w-full mt-4 space-y-2 justify-end items-end">
        {Array.isArray(data) && data
          ?.slice(3)
          .map(({ alb_thumbnail, lec_img, id, img, nid, name }, idx) => {
            return (
              <Link to={`${ALBUMS}${id || nid}`} key={idx} className="w-[90%]">
                <LectChartWidget
                  name={name}
                  img={alb_thumbnail || img || lec_img}
                  idx={idx}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default AlbumMobileChart;
