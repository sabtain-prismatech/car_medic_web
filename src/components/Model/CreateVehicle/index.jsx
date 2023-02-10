import React from "react";
//Modal
import Modal from "react-bootstrap/Modal";
// Icons
import Icons from "@helper/icons";

function CreateVehicleModel(props) {
  const { onHide } = props;

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="delete-modal-wrapper p-5">
          <div className="d-flex justify-content-end ">
            <div className="bg-e50a1e width-50-px height-50 d-flex justify-content-center align-items-center br-50-px">
              <i className="text-danger f-24-px " onClick={onHide}>
                <Icons.AiIcons.AiOutlineClose />
              </i>
            </div>
          </div>
          <div>
            <form action="">
              <div className="mt-3">
                <label htmlFor="">Customer Name</label>
                <br />
                <input type="text" defaultValue={"Sabtain"} />
              </div>
              <div className="mt-3">
                <label htmlFor="">Vehicle No</label>
                <br />
                <input type="text" placeholder="Enter vehicle no" />
              </div>
              <div className="mt-3">
                <label htmlFor="">Vehicle Brand</label>
                <br />
                <input type="text" placeholder="Enter vehicle brand" />
              </div>
              <div className="mt-3">
                <label htmlFor="">Vehicle Model</label>
                <br />
                <input type="text" placeholder="Enter vehicle model" />
              </div>

              <div className="text-center mt-5">
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CreateVehicleModel;
