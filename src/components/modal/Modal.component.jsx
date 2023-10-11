import React, { useMemo, useState } from "react";
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
      overlayClassName="fixed inset-0 w-full h-full bg-white/10 z-50 cursor-pointer modal-overlay "
    >
      <div className="relative w-auto mx-auto cursor-default">
        {/*content*/}
        <div
          className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#1E1E1E] outline-none focus:outline-none w-[94vw] md:w-[60vw] xl:w-[30vw]  p-4 md:p-10 ${className} `}
        >
          {/*header*/}
          {(modalTitle || modalDescription) && (
            <div className="flex items-start justify-start pb-3  rounded-t whitespace-normal">
              <div>
                {modalTitle && (
                  <h3 className="text-xl font-semibold text-white flex justify-center items-start flex-col gap-2">
                    <span>{modalTitle}</span>
                  </h3>
                )}
                {modalDescription && (
                  <p className="text-xs text-gray-200 font-light">
                    {modalDescription}
                  </p>
                )}
              </div>
            </div>
          )}
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
