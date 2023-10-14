import React from "react";
import { useNavigate } from "react-router-dom";
import LecturersChartWidget from "./chartWidgets/lecturersChartWidget";
import { RESOURCE_PERSON } from "../../../utils/routes/constants";
const LecturerMobileChart = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div>
      {Array.isArray(data) && (
        <div className="w-[95%] mx-auto">
          <div className="top3 grid grid-cols-3 items-center gap-10  ">
            <div
              onClick={() => {
                navigate(`${RESOURCE_PERSON}${data[1]?.id}`);
              }}
              className="w-full h-full flex flex-col space-y-3 pt-[5px]  overflow-hidden text-white"
            >
              <div className="w-full relative h-[90px] rounded-full">
                <img
                  className="rounded-full w-full h-full"
                  src={
                    data[1]?.img || "https://imagetolink.com/ib/kk8U1nb2nR.jpeg"
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
            </div>

            <div
              onClick={() => {
                navigate(`${RESOURCE_PERSON}${data[0]?.id}`);
              }}
              className="w-[105%] h-full flex flex-col space-y-3 overflow-hidden text-white"
            >
              <div className="w-full relative h-[100px] rounded-full">
                <img
                  className="rounded-full w-full h-full"
                  src={
                    data[0]?.img || "https://imagetolink.com/ib/kk8U1nb2nR.jpeg"
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
            </div>
            <div
              onClick={() => {
                navigate(`${RESOURCE_PERSON}${data[2]?.id}`);
              }}
              className="w-full h-full flex flex-col space-y-3 pt-[5px] overflow-hidden text-white"
            >
              <div className="w-full relative h-[80px] rounded-full">
                <img
                  className="rounded-full w-full h-full"
                  src={
                    data[2]?.img || "https://imagetolink.com/ib/kk8U1nb2nR.jpeg"
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
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col w-full mt-4 space-y-2 justify-end items-end">
        {Array.isArray(data) &&
          data?.slice(3).map(({ id, img, nid, name }, idx) => {
            return (
              <div
                onClick={() => {
                  navigate(`${RESOURCE_PERSON}${id || nid}`);
                }}
                key={idx}
                className="w-[90%]"
              >
                <LecturersChartWidget img={img} name={name} idx={idx} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LecturerMobileChart;
