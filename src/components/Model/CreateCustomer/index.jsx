import React from "react";
//Modal
import Modal from "react-bootstrap/Modal";
// Icons
import Icons from "@helper/icons";

function CreateCustomerModel(props) {
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
              <input type="text" className="mt-3" placeholder="Enter name" />
              <input
                type="text"
                className="mt-3"
                placeholder="Enter vehicle no"
              />
              <input
                type="text"
                className="mt-3"
                placeholder="Enter vehicle brand"
              />
              <input
                type="text"
                className="mt-3"
                placeholder="Enter vehicle model"
              />
              <input
                type="text"
                className="mt-3"
                placeholder="Enter location"
              />
              <input type="text" className="mt-3" placeholder="Enter phone" />
              <label htmlFor="" className="mt-3">
                Do you have whatsapp Number?
                <input type="checkbox" />
              </label>
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

export default CreateCustomerModel;
