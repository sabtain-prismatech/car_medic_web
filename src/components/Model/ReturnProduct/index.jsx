import React, { useEffect, useState } from "react";
//Modal
import Modal from "react-bootstrap/Modal";
// Icons
import Icons from "@helper/icons";

function ReturnProductModel(props) {
  const { onHide, product } = props;
  const [randomKey, setRandomKey] = useState("");
  console.log(product);
  useEffect(() => {
    let nameLength = product?.customerName?.length;
    setRandomKey(
      product?.customerName?.substr(0, Math.floor(nameLength / 2)) +
        product?._id?.substr(nameLength - 4, 4)
    );
  }, [product]);

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
          <h1>{randomKey}</h1>
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
