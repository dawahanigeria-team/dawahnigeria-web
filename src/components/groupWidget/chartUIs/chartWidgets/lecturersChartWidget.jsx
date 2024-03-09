import React, { useEffect } from "react";
import { IMAGE_PLACEHOLDERS } from "../../../../utils/imagePlaceholders";

const LecturersChartWidget = ({ img, idx, name }) => {
  ////not contented but under presssure by DN project manager
  useEffect(() => {
    const lazy = document.querySelectorAll("#chart-mbile-lecturers");
    function lazyImages() {
      lazy.forEach((im) => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;

        im.addEventListener("error", () => {
          im.src = IMAGE_PLACEHOLDERS.lecturer;
        });
      });
    }

    lazyImages();
  }, []);
  return (
    <div className="relative bg-[#202020] px-3 py-2 rounded-[32px] w-full text-white flex space-x-2 items-center">
      <div className="w-[50px] h-[50px] rounded-full">
        <img
          id="chart-mbile-lecturers"
          className="w-full h-full rounded-full"
          src-data={img}
          src={IMAGE_PLACEHOLDERS.lecturer}
          alt=""
        />
      </div>
      <div className="text-[13px] text-ellipsis whitespace-nowrap overflow-hidden w-[200px]">
        {name}
      </div>
      <div className="absolute left-[-30px]">{idx + 4}</div>
    </div>
  );
};

export default LecturersChartWidget;
