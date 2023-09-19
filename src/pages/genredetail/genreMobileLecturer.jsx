import React, { useEffect } from "react";

const GenreMobileLecturer = ({ img, rp, styling }) => {
  ////not contented but under presssure by DN project manager
  useEffect(() => {
    const lazy = document.querySelectorAll("#lecturer");
    function lazyImages() {
      lazy.forEach((im) => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;

        im.addEventListener("error", () => {
          im.src = "https://imagetolink.com/ib/kk8U1nb2nR.jpeg";
        });
      });
    }

    lazyImages();
  }, []);

  return (
    <div
      className={`flex flex-col space-y-2 justify-center items-center min-[615px]:hidden overflow-hidden   ${
        styling ? "w-full h-[130px]" : "w-[100px] h-[140px]"
      }`}
    >
      <div
        className={
          styling
            ? "w-full h-full rounded-full"
            : "w-[90px] h-[90px] rounded-full"
        }
      >
        <img
          id="lecturer"
          src-data={img}
          src="https://imagetolink.com/ib/kk8U1nb2nR.jpeg"
          alt=""
          className="w-full h-full rounded-full"
        />
      </div>
      <div className="text-white text-[13px] w-[96px] text-ellipsis whitespace-nowrap overflow-hidden">
        {rp}
      </div>
    </div>
  );
};
export default GenreMobileLecturer;
