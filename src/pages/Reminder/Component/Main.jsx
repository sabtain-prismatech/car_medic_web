import React, { useEffect, useState } from "react";
// Components
import Table from "@components/Table";
import Button from "@components/SharedComponents/Button";
// config
import staticData from "@config/config.json";
// services
import { remindOrderListApi } from "@services/order";
// date-formatter
import dateFormat from "dateformat";
// Icons
import Icons from "@helper/icons";
// Model
import RemindCustomerModel from "./RemindCustomer";

export default function Main() {
  const [remindList, setRemindList] = useState([]);
  const [updateRemindList, setUpdateRemindList] = useState(false);
  const [remindModel, setRemindModel] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  // get-all-Reminder-API-start
  const getReminderList = async () => {
    await remindOrderListApi({}).then((response) => {
      if (response?.data?.success) {
        setRemindList(response?.data?.data || []);
      } else {
        console.log(response?.data?.message);
      }
    });
  };
  // get-all-Reminder-API-end

  useEffect(() => {
    getReminderList();
  }, []);

  useEffect(() => {
    if (updateRemindList) {
      setUpdateRemindList(false);
      getReminderList();
    }
  }, [updateRemindList]);

  console.log(remindList);
  //   Handle-Reminder
  const remindHandler = (data) => {
    setSelectedOrder(data);
    setRemindModel(true);
  };

  return (
    <>
      {remindModel ? (
        <RemindCustomerModel
          show={remindModel}
          onHide={() => setRemindModel(false)}
          title="Reminder"
          selectedOrder={selectedOrder}
        />
      ) : (
        ""
      )}
      <div className="mt-5">
        <Table theading={staticData.reminderTableHeadings}>
          {remindList?.map((val, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{val?.customerId?.name}</td>
              <td>
                <div className="d-flex justify-content-center align-items-center">
                  {val?.customerId?.phone}
                  {val?.customerId?.whatsapp ? (
                    <i
                      className="text-success ms-2"
                      title="This number have whatsapp"
                    >
                      <Icons.BsIcons.BsWhatsapp />
                    </i>
                  ) : (
                    ""
                  )}
                </div>
              </td>
              <td>
                <div>
                  {val?.vehicleId?.vehicleNo} ({val?.vehicleId?.vehicleBrand}){" "}
                  <sup>{val?.vehicleId?.vehicleModel}</sup>
                </div>
              </td>
              <td>{val?.remindNumber}</td>
              <td>
                {val?.lastRemindDate
                  ? dateFormat(val?.lastRemindDate, "dd-mmm-yyyy")
                  : "N/A"}
              </td>
              <td>{dateFormat(val?.createdAt, "dd-mmm-yyyy")}</td>
              <td>
                <Button
                  type="button"
                  btn="primary"
                  size="sm"
                  align="mx-auto"
                  onClick={() => remindHandler(val)}
                >
                  Remind
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </>
  );
}
