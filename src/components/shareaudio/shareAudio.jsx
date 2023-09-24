import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import axios from "../../utils/useAxios";
import { shareAudio, sharingChanels } from "./utils";

const ShareAudio = ({ isShare, setisShare, nid, type }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [link, setLink] = useState(true);

  ///**** share audio ******** */
  function share() {
    if (!nid) {
      toast.error("No audio to be shared");
      return;
    }
    const payload = {
      user_id: currentUser?.id,
      item_id: type !== "video" ? parseInt(nid) : nid,
      type: type,
    };
    axios
      .post(`/shareApi.php`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
        },
      })
      .then((res) => {
        // setLink(res.data.success);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    if (nid) {
      setLink(window.location.href);
    }
  }, [nid]);

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
                onClick={() => {
                  shareAudio(item.key, item.link, encodeURIComponent(link));
                  share();
                }}
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
