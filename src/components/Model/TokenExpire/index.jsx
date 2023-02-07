import React from "react";
//Modal
import Modal from "react-bootstrap/Modal";
// Icons
import Icons from "@helper/icons";
// React-Router-Dom
import { useNavigate } from "react-router-dom";

function TokenExpireModel(props) {
  const { onHide } = props;
  const navigate = useNavigate();

  const goToLogin = () => {
    onHide();
    localStorage.removeItem("TOKEN");
    navigate('/login');
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="delete-modal-wrapper p-5">
          <div className="d-flex justify-content-center ">
            <div className="bg-e50a1e width-50-px height-50 d-flex justify-content-center align-items-center br-50-px">
              <i className="text-white f-24-px ">
                <Icons.AiIcons.AiOutlineClose />
              </i>
            </div>
          </div>
          <h2 className="text-center mt-4 heading">
            Your Login Session is Expired!
          </h2>
          <h6 className="text-center mt-2 c-757575 f-13-px">
            Please login again.
          </h6>
          <div className="text-center mt-5 pt-4" onClick={goToLogin}>
            <button className="height-40 px-5 br-4-px darken-bg-030870-10 text-white f-14-px border-0 outline-0">
              OK
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TokenExpireModel;
