import React, { useState, useEffect } from "react";
import "./download.scss";
import axios from "../../utils/useAxios";
import { toast } from "react-hot-toast";

const DownloadAudio = ({ isDownload, setisDownload, nid }) => {
  const [isAMR, setisAMR] = useState(false);
  const [isMP4, setisMP4] = useState(false);
  const [amrText, setamrText] = useState("--");
  const [mp4Text, setmp4Text] = useState("--");
  const [downloadUrl, setdownloadUrl] = useState(null);
  const [data, setdata] = useState();

  ////console.log('@@@@@@@ download', nid)

  useEffect(() => {
    if (!nid) {
      toast.error("No audio to add to be downloaded");
      return;
    }
    const payload = { lecid: nid };
    axios
      .post(`/download_api.php`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
        },
      })
      .then((res) => {
        //console.log('from download',res)
        //console.log(res.data)
        const { data } = res;
        setdata(data);

        const { amr_size, mp3_size } = data;

        setamrText(`${amr_size} [AMR]`);
        setmp4Text(`${mp3_size} [MP3]`);
      })
      .catch((err) => {
        //console.log(err)
      });
  }, [nid]);

  ////console.log(data)

  const selectAMR = () => {
    const { amr_url } = data;
    setisMP4(false);
    setisAMR(true);
    setdownloadUrl(amr_url);
    //console.log(amr_url)
  };

  const selectMP4 = () => {
    const { mp3_url } = data;
    setisMP4(true);
    setisAMR(false);
    setdownloadUrl(mp3_url);
  };

  const handleChild = (e) => {
    e.stopPropagation();
  };

  const downloadlect = () => {
    if (!downloadUrl) return;
    toast.success("Downloading...");
    window.open(downloadUrl, "_blank");
  };
  return (
    <div
      onClick={() => {
        setisDownload(!isDownload);
      }}
      className={
        isDownload ? "fixed_download_wrapper" : "fixed_download_wrapper_none"
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="small_wrapper let swipeDown"
      >
        <div className="download_text">Select to download</div>
        <div
          onClick={selectAMR}
          className={isAMR ? "download_amr" : "download_size"}
        >
          {amrText}
        </div>
        <div
          onClick={selectMP4}
          className={isMP4 ? "download_mp4" : "download_size"}
        >
          {mp4Text}
        </div>

        <button onClick={downloadlect} className="download_btn">
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default DownloadAudio;
