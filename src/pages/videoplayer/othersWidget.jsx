import React, { useEffect } from "react";

const OthersWidget = ({ images, author, views, title }) => {
  ////not contented but under presssure by DN project manager
  useEffect(() => {
    function lazyImage() {
      const lazy = document.querySelectorAll("#others");
      lazy.forEach((im) => {
        const newurl = im.getAttribute("src-data");
        im.src = newurl;

        im.addEventListener("error", () => {
          im.src = "https://imagetolink.com/ib/cswCjNKbQ2.jpeg";
        });
      });
    }

    lazyImage();
  }, []);
  return (
    <div className=" min-[615px]:mb-3 flex cursor-pointer max-[615px]:py-2 min-[615px]:grid grid-cols-8 min-[615px]:gap-[6rem] xl:gap-0 xl:grid-cols-6 items-center space-x-2 ">
      <div className="min-[615px]:w-[90px] h-[66px] w-[120px] col-span-1 xl:col-span-2 min-[615px]:h-[50px] rounded-[6px]">
        <img
          className="w-full h-full rounded-[6px]"
          id="others"
          src-data={images}
          src="https://imagetolink.com/ib/cswCjNKbQ2.jpeg"
          alt=""
        />
      </div>

      <div className="justify-start w-full col-span-7 xl:col-span-4">
        <div className="font-medium text-foreground text-ellipsis whitespace-nowrap overflow-hidden w-[200px] min-[615px]:w-[450px]  xl:w-[150px]">
          {title}
        </div>
        <div className="text-[12px] flex items-center text-color min-[615px]:text-sm ">
          <span className="mr-1">{`${views} views.`}</span>
          <span className="text-ellipsis whitespace-nowrap overflow-hidden w-[200px] min-[615px]:w-[450px] xl:w-[130px]">
            {author}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OthersWidget;
