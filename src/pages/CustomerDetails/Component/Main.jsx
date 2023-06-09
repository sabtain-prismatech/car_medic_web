import React, { useEffect, useState } from "react";
import Typography from "@components/SharedComponents/Typography";
import Pagination from "@components/Pagination";
import PageSelection from "@components/PageSelection";
import Table from "@components/Table";
import Button from "@components/SharedComponents/Button";
// config
import staticData from "@config/config.json";
// dateFormat
import dateFormat from "dateformat";
// icons
import Icons from "@helper/icons";
// services
import { getOrderByCustomerApi } from "@services/order";

export default function Main() {
  const customerLocal = JSON.parse(localStorage.getItem("CUSTOMER_INFO"));
  const [selectedpage, setSelectedpage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(5);
  const [allOrder, setAllOrder] = useState({});

  // get-all-order-API-start
  const getOrderList = async (id) => {
    const params = {
      pageNo: selectedpage,
      perPage: Number(dataPerPage),
      customerId: id,
    };
    await getOrderByCustomerApi(params).then((response) => {
      if (response?.data?.success) {
        setAllOrder(response?.data?.data);
      } else {
        console.log(response?.data?.message);
      }
    });
  };
  // get-all-order-API-end

  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem("CUSTOMER_INFO"));
    getOrderList(customer?._id);
  }, [dataPerPage, selectedpage]);

  return (
    <>
      <div>
        <Typography variant="h3" color="txt_primary" fw="bold">
          Customer <span className="primary">Details</span>
        </Typography>
        {/* customer-details-start */}
        <div className="bg-white px-5 py-4 rounded">
          <div className="row">
            <div className="col-6 mb-4">
              <Typography variant="body2" color="txt_primary" fw="bold">
                Name:{" "}
                <span className="primary fw-semibold">
                  {customerLocal?.name}
                </span>
              </Typography>
            </div>
            <div className="col-6 mb-4">
              <Typography variant="body2" color="txt_primary" fw="bold">
                <div className="d-flex">
                  Phone:{" "}
                  <span className="primary fw-semibold d-flex ms-2">
                    {customerLocal?.phone}{" "}
                    {customerLocal?.whatsapp ? (
                      <i
                        className="text-success ms-2"
                        title="This number have whatsapp"
                      >
                        <Icons.BsIcons.BsWhatsapp />
                      </i>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              </Typography>
            </div>
            <div className="col-6 mb-4">
              <Typography variant="body2" color="txt_primary" fw="bold">
                CreateAt:{" "}
                <span className="primary fw-semibold">
                  {dateFormat(customerLocal?.createdAt, "dd-mmm-yyyy")}
                </span>{" "}
              </Typography>
            </div>
            <div className="col-6 mb-4">
              <Typography variant="body2" color="txt_primary" fw="bold">
                Location:{" "}
                <span className="primary fw-semibold">
                  {customerLocal?.location}
                </span>
              </Typography>
            </div>
            <div className="col-12">
              <Typography variant="body2" color="txt_primary" fw="bold">
                Vehicles:{" "}
                {customerLocal?.vehicles?.map((val, index) => (
                  <span
                    key={index}
                    className="me-4 rounded p-2 bg_secondary_low"
                  >
                    {val?.vehicleNo}({val?.vehicleBrand})
                    <sup className="primary">{val?.vehicleModel || "N/A"}</sup>
                  </span>
                ))}
              </Typography>
            </div>
          </div>
        </div>
        {/* customer-details-end */}
        <Typography variant="h3" color="txt_primary" fw="bold" style="mt-5">
          <i>History</i>
        </Typography>
        {/* order-card-start */}
        {allOrder?.orders?.map((val, index) => (
          <div
            className=" px-5 py-4 bg_secondary_low rounded order-box mb-5"
            key={index}
          >
            <div className="row">
              <div className="col-6 mb-4">
                <Typography variant="body2" color="txt_primary" fw="bold">
                  Order Id:{" "}
                  <span className="primary fw-semibold">{val?._id}</span>
                </Typography>
              </div>
              <div className="col-6 mb-4">
                <Typography variant="body2" color="txt_primary" fw="bold">
                  CreateAt:{" "}
                  <span className="primary fw-semibold">
                    {dateFormat(val?.createdAt, "dd-mmm-yyyy")}
                  </span>{" "}
                </Typography>
              </div>
              <div className="col-6 mb-4">
                <Typography variant="body2" color="txt_primary" fw="bold">
                  Vehicle:{" "}
                  <span className="primary fw-semibold">
                    {val?.vehicleId?.vehicleNo}({val?.vehicleId?.vehicleBrand})
                    <sup className="primary">
                      {val?.vehicleId?.vehicleModel || "N/A"}
                    </sup>
                  </span>
                </Typography>
              </div>
              <div className="col-6 mb-4">
                <Typography variant="body2" color="txt_primary" fw="bold">
                  Number of Remind:{" "}
                  <span className="primary fw-semibold">
                    {val?.remindNumber}
                  </span>
                </Typography>
              </div>
              {val?.lastRemindDate && (
                <div className="col-6 mb-4">
                  <Typography variant="body2" color="txt_primary" fw="bold">
                    Last Remind Date:{" "}
                    <span className="primary fw-semibold">
                      {dateFormat(val?.lastRemindDate, "dd-mmm-yyyy")}
                    </span>
                  </Typography>
                </div>
              )}

              {val?.currentMileage !== 0 ? (
                <div className="col-6 mb-4">
                  <Typography variant="body2" color="txt_primary" fw="bold">
                    Current Mileage:{" "}
                    <span className="primary fw-semibold">
                      {val?.currentMileage}
                    </span>
                  </Typography>
                </div>
              ) : (
                ""
              )}
              {val?.bestKM !== 0 ? (
                <div className="col-6 mb-4">
                  <Typography variant="body2" color="txt_primary" fw="bold">
                    Best KM:{" "}
                    <span className="primary fw-semibold">
                      {val?.bestKM}
                      <sup>({val?.currentMileage + val?.bestKM})</sup>
                    </span>
                  </Typography>
                </div>
              ) : (
                ""
              )}
            </div>
            <hr />
            <Typography variant="h3" color="primary" fw="bold" style="mt-3">
              <i>Services</i>
            </Typography>
            <div className="mt-3">
              {val?.servicesId?.map((val, index) => (
                <div key={index} className="mb-2">
                  <Typography variant="body2" color="txt_primary" fw="bold">
                    {val?.name} <sup>({val?.price})</sup>
                  </Typography>
                </div>
              ))}
              {val?.otherServices?.map((val, index) => (
                <div key={index} className="mb-2">
                  <Typography variant="body2" color="txt_primary" fw="bold">
                    {val?.name} <sup>({val?.price})</sup>
                  </Typography>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <Typography variant="h3" color="primary" fw="bold" style="mt-3">
              <i>Products</i>
            </Typography>
            <div className="mt-3">
              <Table theading={staticData.OrderDetailsSaleTableHeadings}>
                {val?.productId?.map((val, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val?.name || ""}</td>
                    <td>
                      {val?.quantity.$numberDecimal || 0}{" "}
                      {val?.productType === "liquid" ? "ltr" : ""}
                    </td>
                    <td>
                      {`(${val?.quantity.$numberDecimal} x ${
                        val?.salePrice
                      }) , ${val?.salePrice * val?.quantity.$numberDecimal}`}
                    </td>
                    <td>{val?.discount || 0}</td>
                    <td>
                      {val?.salePrice * val?.quantity.$numberDecimal -
                        val?.discount}
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
            <hr className="my-5" />
            <div className="row d-flex justify-content-end mb-4">
              <div className="col-6">
                <div className="row mb-4">
                  <div className="col-6">
                    <Typography
                      variant="body1"
                      color="txt_primary"
                      fw="bold"
                      align="text-end"
                    >
                      Discount
                    </Typography>
                  </div>
                  <div className="col-6">
                    <Typography
                      variant="body1"
                      color="txt_primary"
                      fw="bold"
                      align="text-end"
                    >
                      {val?.discount}
                    </Typography>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <Typography
                      variant="body1"
                      color="txt_primary"
                      fw="bold"
                      align="text-end"
                    >
                      Grand Total
                    </Typography>
                  </div>
                  <div className="col-6">
                    <Typography
                      variant="h2"
                      color="primary"
                      fw="bold"
                      align="text-end"
                    >
                      {val?.total}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-5" />
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                size="md"
                title="Download the Order"
                align="m-none me-3"
              >
                Download
              </Button>
              <Button
                type="button"
                size="md"
                title="Print the Sticker"
                align="m-none me-3"
                variant="outline"
                disabled={true}
              >
                Print Sticker
              </Button>
              <Button
                type="button"
                size="md"
                title="Download the Order"
                align="m-none"
                variant="outline"
              >
                Share
              </Button>
            </div>
          </div>
        ))}
        {/* order-card-end */}
        <div className="mt-5 d-flex justify-content-between align-items-center">
          <PageSelection
            dataPerPage={(value) => setDataPerPage(value)}
            value={dataPerPage}
          />
          <Pagination
            pageCount={Number(allOrder?.pages)}
            selectedpage={(value) => setSelectedpage(value)}
          />
        </div>
      </div>
    </>
  );
}
