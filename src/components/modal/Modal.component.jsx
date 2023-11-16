import React, { useMemo, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ReactModal from "react-modal";

export const Modal = ({
  className,
  modalTitle = "",
  modalDescription,
  children,
  show = null,
  contentLabel = "Modal",
  onShowCallback,
  onCloseCallback,
}) => {
  const [showModal, setShowModal] = useState(false);

  const customStyles = useMemo(() => {
    return {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%, -50%)",
      },
    };
  }, []);

  const closeModal = () => setShowModal(false);

  // open or close modal based on show prop
  useMemo(() => {
    if (show) {
      setShowModal(true);
    } else if (show !== null) {
      if (!show) {
        closeModal();
      }
    }
  }, [show]);

  useMemo(() => ReactModal.setAppElement("body"), []);

  return (
    <ReactModal
      isOpen={showModal}
      onAfterOpen={() => onShowCallback?.()}
      onAfterClose={() => onCloseCallback?.()}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={contentLabel}
      className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ease-linear transition-all duration-150  modal"
      overlayClassName="fixed inset-0 w-full h-full bg-white/50 dark:bg-black/50 z-50  cursor-pointer modal-overlay "
    >
      <div className="relative w-auto mx-auto cursor-default">
        {/*content*/}
        <div
          className={`dark:border-0 rounded-lg shadow-xl relative flex flex-col border border-gray-300 bg-white dark:bg-[#1E1E1E] outline-none focus:outline-none w-[95vw] md:w-[60vw] xl:w-[30vw]  p-4 md:p-10 ${className} `}
        >
          {/*header*/}
          <div className="relative">
            {(modalTitle || modalDescription) && (
              <div className="flex items-start justify-start pb-3  rounded-t whitespace-normal">
                <div>
                  {modalTitle && (
                    <h3 className="text-xl font-semibold text-foreground flex justify-center items-start flex-col gap-2">
                      <span>{modalTitle}</span>
                    </h3>
                  )}
                  {modalDescription && (
                    <p className="text-xs text-foreground font-light">
                      {modalDescription}
                    </p>
                  )}
                </div>
              </div>
            )}

            <button
              aria-label="close modal"
              className="absolute top-1 right-1"
              onClick={closeModal}
            >
              <AiOutlineCloseCircle
                className="text-primary-500 text-2xl"
                aria-hidden="true"
              />
            </button>
          </div>
          {/*body*/}
          <div className="relative pt-2 flex flex-wrap flex-col whitespace-normal">
            {children}
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

Modal.displayName = "Modal";
