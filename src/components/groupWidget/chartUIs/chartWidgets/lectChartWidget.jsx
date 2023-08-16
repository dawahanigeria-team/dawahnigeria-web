import React, {useEffect} from 'react';

const LectChartWidget = ({img, name, idx}) => {

      ////not contented but under presssure by DN project manager
  useEffect(() => {
    const lazy = document.querySelectorAll("#chart-mbile");
    lazy.forEach((im) => {
      const newurl = im.getAttribute("src-data");
      im.src = newurl;

      im.addEventListener("error", () => {
        im.src = "https://imagetolink.com/ib/TnDGh8F6J0.jpeg";
      });
    });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    return (
        <div  className="relative bg-[#202020] p-2 rounded-md w-full text-white flex space-x-2 items-center">
        <div className="w-[50px] h-[50px] rounded-md">
          <img
            id="chart-mbile"
            className="w-full h-full rounded-md"
            src-data={img}
            src={"https://imagetolink.com/ib/TnDGh8F6J0.jpeg"}
            alt=""
          />
        </div>
        <div className="text-[13px] text-ellipsis whitespace-nowrap overflow-hidden w-[200px]">
          {name}
        </div>
        <div className="absolute left-[-30px]">{idx + 4}</div>
      </div>
    )
}

export default LectChartWidget