import React from "react";
//Modal
import Modal from "react-bootstrap/Modal";
// Typography
import Typography from "@components/SharedComponents/Typography";
import Button from "@components/SharedComponents/Button";
// React-Router-Dom
import { useNavigate } from "react-router-dom";

function TokenExpireModel(props) {
  const { onHide } = props;
  const navigate = useNavigate();

  const goToLogin = () => {
    onHide();
    localStorage.removeItem("TOKEN");
    navigate("/login");
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop={false}
      >
        <div className=" p-5">
          <Typography
            variant="h3"
            fw="bold"
            style=" text-center"
            color="txt_primary"
          >
            Your Login Session is Expired!
          </Typography>
          <Typography
            variant="body1"
            fw="semibold"
            style="mb-4 text-center"
            color="txt_primary"
          >
            Please login again.
          </Typography>

          <div className="text-center mt-5">
            <Button type="button" align="mx-auto" onClick={goToLogin}>
              Login
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TokenExpireModel;
