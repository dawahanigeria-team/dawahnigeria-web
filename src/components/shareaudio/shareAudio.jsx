import React, { useState, useEffect } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "../../utils/useAxios";
import { IoIosClose } from "react-icons/io";
import copy from "copy-to-clipboard";

const ShareAudio = ({ isShare, setisShare, nid, type }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [link, setLink] = useState();

  ///**** share audio ******** */
  useEffect(() => {
    async function share() {
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
          //console.log("from share payload", res);

          setLink(res.data.success);
          // window.open(res.data.success, "_blank");
        })
        .catch((err) => {
          //console.log(err);
        });
    }

    share();
  }, [nid]);

  const shareAudio = (e) => {
    e.stopPropagation();
    copy(link);
    toast.success(`successfully copied`);
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
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="let swipeDown share_box w-[80%] min-[615px]:w-[40%]  inset-0 absolute m-auto flex flex-col item-center justify-center py-6 px-4 h-fit space-y-4 rounded-md bg-[#1E1E1E]"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setisShare(!isShare);
          }}
          className="close_btn absolute right-3 top-2"
        >
          <IoIosClose className="text-white text-[22px]" />
        </div>

        <input
          type="text"
          name="text"
          value={link}
          readOnly
          className="w-full min-[450px]:h-9 md:h-11 outline-none border border-gray-200 bg-[#1E1E1E] text-[#CFCFCF] rounded-lg max-[615px]:rounded-md "
        />

        <button
          onClick={(e) => {
            shareAudio(e);
          }}
          className="share_btn flex justify-center items-center space-x-2 text-white"
        >
          <div className="bg-amber-500 rounded-full p-1 flex items-center justify-center">
            <BsLink45Deg className="min-[615px]:text-[30px] text-[22px] " />
          </div>
          <span>Copy Link</span>
        </button>
      </div>
    </div>
  );
};

export default ShareAudio;
