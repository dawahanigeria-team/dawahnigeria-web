import React, { useState, useEffect } from "react";
import "./carousel.css";
import mobile4 from "../../../assets/png/mobileslide/mobile4.png";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import ImageWidget from "./imageWidget";

const MyCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  ////console.log(currentIndex);
  return (
    <div className="w-full group h-full relative items-end justify-end px-[5] flex cursor-pointer">
      <div className="w-full hidden inset-0 group-hover:flex justify-between items-center h-fit m-auto z-[30] absolute">
        <div
          onClick={() => {
            setCurrentIndex((currentIndex - 1) % images.length);
          }}
          className="bg-black bg-opacity-70 flex justify-center items-center h-[60px] w-[30px]"
        >
          <MdNavigateBefore className="text-white text-[40px]" />
        </div>
        <div
          onClick={() => {
            setCurrentIndex((currentIndex + 1) % images.length);
          }}
          className="bg-black bg-opacity-70 flex justify-center items-center h-[60px] w-[30px]"
        >
          <MdNavigateNext className="text-white text-[40px]" />
        </div>
      </div>
      {images.map((image, index) => {
        return (
          <div className=" absolute left-0 top-0 w-[73%] h-[250px] min-[950px]:h-[250px] min-[1050px]:h-[250px] min-[1283px]:h-[300px] ">
            <div
              className={` transform ease h-full w-full duration-500 opacity-0 absolute left-0  shadow-xl ${
                currentIndex % images.length === index ? "active " : ""
              } ${
                (currentIndex + 1) % images.length === index ? " preactive" : ""
              } ${(currentIndex + 2) % images.length === index ? "third " : ""} 
              `}
            >
              <ImageWidget image={image} />
            </div>

            <div className="w-full flex items-center z-[12]   justify-center space-x-1 absolute bottom-7 inset-x-0">
              {images.map((img, index) => {
                return (
                  <span
                    className={`rounded-[50%] h-[4px] w-[4px] ${
                      currentIndex === index ? "bg-white" : "bg-gray-400"
                    }`}
                  ></span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyCarousel;
