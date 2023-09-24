import { IoIosClose } from "react-icons/io";
import { SiFacebook } from "react-icons/si";
import { RiWhatsappFill } from "react-icons/ri";
import { FaFacebookMessenger, FaTelegram } from "react-icons/fa";
import { RiTwitterFill } from "react-icons/ri";
import { BsLink45Deg } from "react-icons/bs";
import { toast } from "react-hot-toast";
import copy from "copy-to-clipboard";

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
