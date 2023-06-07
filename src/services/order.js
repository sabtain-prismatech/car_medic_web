import axios from "@axios/axiousConfig";

// Create-Order-API-start
export const createOrderApi = async (data) => {
  //endPoint
  const endPoint = "/order/create";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On create order API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// Create-Order-API-End

// Get-Order-List-By-Customer-ID-STart
export const getOrderByCustomerApi = async (data) => {
  //endPoint
  const endPoint = "/order/list/customer";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On order list API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// Get-Order-List-By-Customer-ID-End

// Remind-Order-list-start
export const remindOrderListApi = async (data) => {
  //endPoint
  const endPoint = "/order/reminder/list";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On Remind order list API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// Remind-Order-list-end

// Remind-customer-start
export const remindedCustomerApi = async (data) => {
  //endPoint
  const endPoint = "/order/reminded";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On Remind the customer API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// Remind-customer-end
