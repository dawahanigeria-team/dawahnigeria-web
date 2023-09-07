import React, { useContext} from "react";
import { useDispatch } from "react-redux";
import {  Link } from "react-router-dom";
import { getCount, getPack } from "../../../Redux/Actions/ActionCreators";
import { AudioContext } from "../../../App";
import LectChartWidget from "./chartWidgets/lectChartWidget";
import { LECTURE } from "../../../utils/routes/constants";
const LectureMobileChart = ({ data }) => {

  const dispatch = useDispatch();
  const { setinitial } = useContext(AudioContext);

  const gotoLecture = () => {
    dispatch(getPack(null));
   
    dispatch(getPack(data));
    setinitial(false);
  };



  return (
    <div>
      <div className="w-[95%] mx-auto">
        <div className="top3 grid grid-cols-3 items-center gap-10  ">
          <Link to={`${LECTURE}${data[1]?.id}`}
            onClick={() => {
              gotoLecture();
              dispatch(getCount(1))
            }}
            className="w-full h-full flex flex-col space-y-3 pt-[5px]  overflow-hidden text-white"
          >
            <div className="w-full relative h-[90px] rounded-md">
              <img
                className="rounded-md w-full h-full"
            
                src={data[1]?.img || data[1]?.lec_img ||"https://imagetolink.com/ib/TnDGh8F6J0.jpeg"}
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
              {data[1]?.mp3_title}
            </div>
          </Link>

          <Link to={`${LECTURE}${data[0]?.id}`}
            onClick={() => {
              gotoLecture();
              dispatch(getCount(0))
            }}
            className="w-[105%] h-full flex flex-col space-y-3 overflow-hidden text-white"
          >
            <div className="w-full relative h-[100px] rounded-md">
              <img
                className="rounded-md w-full h-full"
                
                src={ data[0]?.img || data[0]?.lec_img || "https://imagetolink.com/ib/TnDGh8F6J0.jpeg"}
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
              {data[0]?.mp3_title}
            </div>
          </Link>
          <Link to={`${LECTURE}${data[2]?.id}`}
            onClick={() => {
              gotoLecture();
              dispatch(getCount(2))
            }}
            className="w-full h-full flex flex-col space-y-3 pt-[5px] overflow-hidden text-white"
          >
            <div className="w-full relative h-[80px] rounded-md">
              <img
                className="rounded-md w-full h-full"
              
                src={data[2]?.img || data[2]?.lec_img || "https://imagetolink.com/ib/TnDGh8F6J0.jpeg"}
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
        {data?.slice(3).map(({ mp3_title, id, lec_img, img }, idx) => {
          return (
            <Link to={`${LECTURE}${id}`}
              onClick={() => {
                dispatch(getPack(null));
              
                dispatch(getCount(idx+4))
                dispatch(getPack(data));
                setinitial(false);
              }}
              key={idx}
              className="w-[90%]"
            >
             <LectChartWidget name={mp3_title} img={img || lec_img} idx={idx} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LectureMobileChart;
