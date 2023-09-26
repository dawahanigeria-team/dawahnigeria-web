import { IoIosClose } from "react-icons/io";
import { SiFacebook } from "react-icons/si";
import { RiWhatsappFill } from "react-icons/ri";
import { FaFacebookMessenger, FaTelegram } from "react-icons/fa";
import { RiTwitterFill } from "react-icons/ri";
import { BsLink45Deg } from "react-icons/bs";
import { toast } from "react-hot-toast";
import copy from "copy-to-clipboard";
import axios from "axios";
import { updateAudioShareCount } from "../../Redux/Actions/ActionCreators";

export const shareAudio = (key, socalLink, linkToShare) => {
  if (key !== "Copy to clipboard") {
    window.open(`${socalLink}${linkToShare}`, "_blank");
    return;
  }

  copy(linkToShare);
  toast.success(`successfully copied`);
};

export const sharingChanels = [
  {
    key: "WhatsApp",
    link: "https://api.whatsapp.com/send?text=",
    icon: (
      <RiWhatsappFill className="min-[615px]:text-[35px] text-[28px] hover:text-[40px]" />
    ),
  },
  {
    key: "Facebook",
    link: "https://www.facebook.com/sharer/sharer.php?u=",
    icon: (
      <SiFacebook className="min-[615px]:text-[35px] text-[28px] hover:text-[40px]" />
    ),
  },
  {
    key: "Twitter",
    link: "https://twitter.com/intent/tweet?url=",
    icon: (
      <RiTwitterFill className="min-[615px]:text-[35px] text-[28px] hover:text-[40px] " />
    ),
  },
  {
    key: "Telegram",
    link: "https://t.me/share/url?url=",
    icon: (
      <FaTelegram className="min-[615px]:text-[35px] text-[28px] hover:text-[40px] ease-in-out duration-300" />
    ),
  },
  {
    key: "Copy to clipboard",
    link: "https://t.me/share/url?url=",
    icon: (
      <BsLink45Deg className="min-[615px]:text-[35px] text-[28px] hover:text-[40px] ease-in-out duration-300" />
    ),
  },
];

export const shareLink = (id, currentUserId, type) => {
  return (dispatch) => {
    dispatch(updateAudioShareCount());
    if (!id) {
      toast.error("No audio to be shared");
      return;
    }
    const payload = {
      user_id: currentUserId,
      item_id: type !== "video" ? parseInt(id) : id,
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
  };
};
