import React from "react";
import { useNavigate } from "react-router-dom";
import LecturersChartWidget from "./chartWidgets/lecturersChartWidget";

const LecturerMobileChart = ({ data }) => {
  const navigate = useNavigate();


  return (
    <div>
      <div className="w-[95%] mx-auto">
        <div className="top3 grid grid-cols-3 items-center gap-10  ">
          <div
            onClick={() => {
              navigate(`/rp/${data[1]?.id || data[1]?.nid}`);
            }}
            className="w-full h-full flex flex-col space-y-3 pt-[5px]  overflow-hidden text-white"
          >
            <div className="w-full relative h-[90px] rounded-full">
              <img
                className="rounded-full w-full h-full"
                
                src={data[1]?.img || data[1]?.lec_img || "https://imagetolink.com/ib/kk8U1nb2nR.jpeg"}
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
              navigate(`/rp/${data[0]?.id || data[0]?.nid}`);
            }}
            className="w-[105%] h-full flex flex-col space-y-3 overflow-hidden text-white"
          >
            <div className="w-full relative h-[100px] rounded-full">
              <img
                className="rounded-full w-full h-full"
                
                src={data[0]?.img || data[0]?.lec_img || "https://imagetolink.com/ib/kk8U1nb2nR.jpeg"}
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
              navigate(`/rp/${data[2]?.id || data[2]?.nid}`);
            }}
            className="w-full h-full flex flex-col space-y-3 pt-[5px] overflow-hidden text-white"
          >
            <div className="w-full relative h-[80px] rounded-full">
              <img
                className="rounded-full w-full h-full"
                src={data[2]?.img || data[2]?.lec_img || "https://imagetolink.com/ib/kk8U1nb2nR.jpeg"}
                
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

      <div className="flex flex-col w-full mt-4 space-y-2 justify-end items-end">
        {data?.slice(3).map(({ lec_img, id, img, nid, name }, idx) => {
          return (
            <div
              onClick={() => {
                navigate(`/rp/${id || nid}`);
              }}
              key={idx}
              className="w-[90%]"
              
            >
            <LecturersChartWidget img={lec_img || img} name={name} idx={idx}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LecturerMobileChart;
