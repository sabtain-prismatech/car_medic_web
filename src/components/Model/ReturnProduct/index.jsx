import React, { useEffect } from "react";
//Modal
import Modal from "react-bootstrap/Modal";
// Icons
import Icons from "@helper/icons";

function ReturnProductModel(props) {
  const { onHide } = props;

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="return-modal-wrapper p-5">
          <h4>Are you sure to return the product</h4>
          <h1>1va7Ga</h1>
          <input type="text" />
          <div>
            <button>Submit</button>
            <button>Cancel</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ReturnProductModel;
