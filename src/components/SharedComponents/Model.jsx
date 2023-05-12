import React from "react";
//Modal
import Modal from "react-bootstrap/Modal";
import Typography from "./Typography";
// Icons
import Icons from "@helper/icons";
// style
import "@styles/scss/sharedComponent/model.scss";

function ModelPopup(props) {
  const { onHide, size = "md", backdrop = true, title, children } = props;

  return (
    <>
      <Modal
        {...props}
        size={size}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop={backdrop}
      >
        <div className="modal-wrapper pt-4 pb-5 px-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Typography variant="h3" fw="bold">
              {title || ""}
            </Typography>
            <i className="close-icon" onClick={onHide}>
              <Icons.AiIcons.AiOutlineClose />
            </i>
          </div>
          {children}
        </div>
      </Modal>
    </>
  );
}

export default ModelPopup;
