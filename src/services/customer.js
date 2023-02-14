import axios from "@axios/axiousConfig";

// get-customer-list-API-start
export const getAllCustomersApi = async (data) => {
  //endPoint
  const endPoint = "/customer/list";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On Get Customer List API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// get-customer-list-API-End

// Create-Customer-API-Start
export const CreateCustomersApi = async (data) => {
  //endPoint
  const endPoint = "/customer/create";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On Create Customer API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// Create-Customer-API-End
