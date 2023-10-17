import { useMemo, useState } from "react";
import downbig from "../../assets/svg/boom-download.svg";
import { formatNumber } from "../UI/formatter";
import { Modal } from "../modal/Modal.component";
import { useDownloadLecture } from "../../hooks";
import { FaCheckCircle } from "react-icons/fa";
import Loader from "../UI/loader/loader";

export const AudioDownloadModal = ({
  downloads,
  nid,
  triggerInnerChild,
  className = "",
}) => {
  const [showModal, setShowModal] = useState();
  const [selectedFormat, setSelectedFormat] = useState("mp3");

  const { data, isLoading, download } = useDownloadLecture(nid);

  const handleSubmit = (e) => {
    e.preventDefault();
    download(selectedFormat === "amr" ? data?.amr_url : data?.mp3_url);
  };

  const downloadOptions = useMemo(
    () => [
      { format: "amr", urlKey: "amr_url" },
      { format: "mp3", urlKey: "mp3_url" },
    ],
    []
  );
  return (
    <div
      onClick={(e) => {
        // preventing parent element from receiving click event from any of the children
        e.stopPropagation();
      }}
    >
      {/* Trigger button */}
      <button
        onClick={() => setShowModal(true)}
        aria-label="Download audio"
        className={className}
      >
        {triggerInnerChild ? (
          triggerInnerChild
        ) : (
          <div className="audiodetail_download">
            <img src={downbig} alt="" className="audiodetail_download_icon" />
            <p className="audiodetail_download_text">
              {formatNumber(downloads || 0) }
            </p>
          </div>
        )}
      </button>
      {/* modal  */}
      <Modal
        show={showModal}
        onCloseCallback={() => setShowModal(false)}
        modalTitle="Download audio"
        modalDescription="Select your preferred type of file"
      >
        {isLoading ? (
          <div className="h-20 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="divide-y  w-full text-white">
              {downloadOptions?.map(({ format, urlKey }, index) => (
                <label
                  key={index}
                  htmlFor={`${format}-download`}
                  className={`block px-5 py-4 lg:py-6 cursor-pointer ease-in-out duration-300  hover:bg-primary-500/10 flex justify-between items-center uppercase`}
                >
                  <input
                    type="radio"
                    name="download-option"
                    id={`${format}-download`}
                    value={format}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="hidden"
                  />
                  {data?.[urlKey]
                    ? `${data?.[format + "_size"]} [${format}]`
                    : "--"}

                  {selectedFormat === format && (
                    <FaCheckCircle
                      className="text-primary-500 text-2xl"
                      aria-hidden="true"
                    />
                  )}
                </label>
              ))}
            </div>
            <div>
              <button
                type="submit"
                className="text-center bg-primary-500 hover:bg-primary-500/90 text-[#030303] py-4 lg:py-6 w-full mt-3"
              >
                Download
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
