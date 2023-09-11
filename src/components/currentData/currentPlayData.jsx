import React from "react";
import { Link } from "react-router-dom";
const CurrentPlayData = ({ datas, iscurrents, setcurrents }) => {
  //  const data = []
  //console.log('current datas',datas)
  return (
    <div
      onClick={() => {
        setcurrents(!iscurrents);
      }}
      className={
        iscurrents ? "w-full inset-0 z-[55] fixed bg-none h-full" : "hidden"
      }
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-full h-fit max-h-[50vh] let swipeUp overflow-hidden fixed pt-2 pb-6 bottom-[130px] inset-x-0 bg-black bg-opacity-[0.97] rounded-t-2xl"
      >
        <div className="w-[20%] h-[6px] rounded-3xl bg-[#0D0D0D] mx-auto"></div>
        <div className="w-full h-full overflow-hidden ">
          <div className="overflow-auto w-full h-fit max-h-[48vh]">
            <div>
              {datas?.length === 0 && (
                <div className="text-[#868686] w-full h-full flex justify-center items-center">
                  -no lecture-
                </div>
              )}
              {datas?.length !== 0 &&
                datas?.map(({ title, nid }, idx) => {
                  return (
                    <div key={idx}>
                      <Link
                        to={`/l/${nid}`}
                        className="w-full px-2 py-4 border-b text-gray-300 text-[13px] text-sm border-gray-300 flex flex-col"
                      >
                        <div>{title}</div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentPlayData;
