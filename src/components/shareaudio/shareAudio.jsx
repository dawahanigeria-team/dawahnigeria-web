import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shareLink, shareAudio, sharingChanels } from "./utils";

const ShareAudio = ({ isShare, setisShare, nid, type }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [link, setLink] = useState(true);

  ///**** share audio ******** */
  useEffect(() => {
    if (nid) {
      setLink(window.location.href);
    }
  }, [nid]);

  const handleShareAdiolInk = (item) => {
    shareAudio(item.key, item.link, encodeURIComponent(link));
    dispatch(shareLink(nid, currentUser?.id, type));
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setisShare(!isShare);
      }}
      className={
        isShare
          ? `share_wrap w-full h-full inset-0 fixed z-[80] bg-black bg-opacity-60`
          : "hidden"
      }
    >
      <div className="let swipeDown share_box w-[80%] min-[615px]:w-[40%]  inset-0 absolute m-auto flex flex-col item-center justify-center py-6 px-4 h-[80px] space-y-4 rounded-md bg-[#1E1E1E]">
        <div className="share_btn flex justify-center items-center space-x-2 text-white">
          {sharingChanels.map((item, index) => {
            return (
              <span
                title={item.key}
                key={item.key}
                className="hover:bg-amber-500 rounded-full p-1 flex items-center justify-center cursor-pointer"
                onClick={() => handleShareAdiolInk(item)}
              >
                {item.icon}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShareAudio;
