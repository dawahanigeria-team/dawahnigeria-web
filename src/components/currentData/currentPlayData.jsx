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
        className="w-full h-[48vh] let swipeUp absolute bottom-[-9px] pt-2 pb-6 inset-x-0 bg-background bg-opacity-[0.97] rounded-t-2xl"
      >
        <div className="w-[20%] h-[6px] rounded-3xl bg-primary-foreground mx-auto"></div>
        <div className="w-full h-full ">
          <div className="overflow-y-auto w-full h-fit max-h-[50vh] bg-background bg-opacity-[0.97]">
            <div>
              {datas?.length === 0 && (
                <div className="text-color w-full h-full flex justify-center items-center">
                  -no lecture-
                </div>
              )}
              {datas?.length !== 0 &&
                datas?.map(({ title,Title, nid }, idx) => {
                  return (
                    <div key={idx}>
                      <Link
                        to={`/dawahcast/l/${nid}`}
                        className="w-full px-2 py-4 border-b text-color text-[13px] text-sm border-gray-300 flex flex-col"
                      >
                        <div>{Title || title}</div>
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
