import React, { useRef, useState } from "react";
//Modal
import ModelPopup from "@components/SharedComponents/Model";
import Button from "@components/SharedComponents/Button";
import Typography from "@components/SharedComponents/Typography";
// Icons
import Icons from "@helper/icons";
// React-Toastify-for-Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// helper
import { toastPromise } from "@helper/toastPromise";
// dateformat
import dateFormat from "dateformat";
// services
import { remindedCustomerApi } from "@services/order";

function RemindCustomerModel(props) {
  const { selectedOrder, updateRemindList, onHide } = props;
  const [copied, setCopied] = useState(false);
  const [isRemind, setIsRemind] = useState(false);
  const textRef = useRef(null);
  // copy-the-code
  const copyToClipboard = () => {
    const range = document.createRange();
    range.selectNode(textRef.current);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  // Genrate-whatsapp-link-start
  const generateWhatsAppLink = (phoneNumber, message) => {
    let formattedPhoneNumber = phoneNumber.trim();

    if (formattedPhoneNumber.startsWith("+92")) {
      formattedPhoneNumber = formattedPhoneNumber.replace("+", "");
    } else if (formattedPhoneNumber.startsWith("0")) {
      formattedPhoneNumber = "92" + formattedPhoneNumber.substr(1);
    }

    console.log(formattedPhoneNumber);

    const baseUrl = "https://web.whatsapp.com/send";
    const encodedPhoneNumber = encodeURIComponent(formattedPhoneNumber);
    const encodedMessage = encodeURIComponent(message);
    const link = `${baseUrl}?phone=${encodedPhoneNumber}&text=${encodedMessage}`;
    return link;
  };

  const handleShareClick = (phoneNumber, message) => {
    const whatsappLink = generateWhatsAppLink(phoneNumber, message);
    console.log(whatsappLink);
    window.open(whatsappLink, "_blank");
  };
  // Genrate-whatsapp-link-end

  // Create-Message-for-Remind-start
  const createMessage = () => {
    if (selectedOrder?.currentMileage !== 0 && selectedOrder?.bestKM !== 0) {
      return `Hello ${selectedOrder?.customerId?.name}!
      It's time for your car's oil change at CarMadic. Our records show that your last oil change was at ${
        selectedOrder?.currentMileage
      }. To ensure optimal performance, we recommend changing the oil at ${
        selectedOrder?.currentMileage + selectedOrder?.bestKM
      }. Visit us soon for a smooth and efficient ride!`;
    } else {
      return `Hello ${
        selectedOrder?.customerId?.name
      }! Just a friendly reminder that during your last visit to CarMadic at ${dateFormat(
        selectedOrder?.createdAt,
        "dd-mmm-yyyy"
      )}, you had the following services done:
${(selectedOrder?.servicesId ?? [])
  .map((val) => {
    return `* ${val?.name} (${val?.price})`;
  })
  .join("\n")} ${(selectedOrder?.otherServices ?? [])
        .map((val) => {
          return `* ${val?.name} (${val?.price})`;
        })
        .join("\n")}
${(selectedOrder?.productId ?? [])
  .map((val) => {
    return `* ${val?.name} (${
      val?.quantity.$numberDecimal * Number(val?.salePrice) -
      Number(val?.discount)
    })`;
  })
  .join("\n")}
We hope our services exceeded your expectations and left you impressed. If it's time for your next car maintenance, remember that we're here to provide you with exceptional service once again. See you soon!`;
    }
  };
  // Create-Message-for-Remind-end

  // Reminded-the-customer-start
  const remindedCustomerFun = async () => {
    const params = {
      orderId: selectedOrder?._id,
    };
    await remindedCustomerApi(params).then((response) => {
      // Toast-code-start
      toast.promise(toastPromise(response), {
        pending: "Please wait...",
        success: {
          render({ data }) {
            updateRemindList(true);
            setTimeout(() => {
              onHide();
            }, 1500);
            return `${data}`;
          },
          autoClose: 1500,
        },
        error: {
          render({ data }) {
            return `${data} `;
          },
          autoClose: 3000,
        },
      });
    });
  };
  // Reminded-the-customer-end

  return (
    <>
      <ModelPopup {...props}>
        <ToastContainer position="top-center" toastClassName="carCare-toast" />
        <div ref={textRef}>
          <Typography variant="h3" fw="bold">
            CarMadic Reminder!
          </Typography>
          <Typography variant="body1">{createMessage()}</Typography>
        </div>
        <div className="d-flex justify-content-end mt-5">
          {isRemind ? (
            <Button
              type="button"
              btn="primary"
              variant="outline"
              size="md"
              align="m-none me-3"
              onClick={remindedCustomerFun}
            >
              Confirm Remind
            </Button>
          ) : (
            <Button
              type="button"
              btn="primary"
              variant="outline"
              size="md"
              align="m-none me-3"
              onClick={() => setIsRemind(true)}
            >
              Remind
            </Button>
          )}
          <Button
            type="button"
            btn="secondary"
            size="md"
            onClick={copyToClipboard}
            align="m-none me-3"
            startIcon={<Icons.MdIcons.MdOutlineContentCopy />}
          >
            Copy
          </Button>
          <Button
            type="button"
            btn="primary"
            size="md"
            align="m-none"
            onClick={() =>
              handleShareClick(
                selectedOrder?.customerId?.phone,
                createMessage()
              )
            }
          >
            Share
          </Button>
        </div>
        {copied && (
          <Typography
            variant="small"
            fw="semibold"
            align="text-center"
            color="text-success"
            style="mt-4"
          >
            Copied!
          </Typography>
        )}
      </ModelPopup>
    </>
  );
}

export default RemindCustomerModel;
