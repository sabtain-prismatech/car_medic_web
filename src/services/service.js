import axios from "@axios/axiousConfig";

// Create-service-API-start
export const createServiceApi = async (data) => {
  //endPoint
  const endPoint = "/service/create";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On create service API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// Create-service-API-End

// service-list-start
export const serviceListApi = async (data) => {
  //endPoint
  const endPoint = "/service/list";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On list service API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// service-list-end

// service-list-with-out-pagination-start
export const serviceListSimpleApi = async (data) => {
  //endPoint
  const endPoint = "/service/list/simple";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On list service API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// service-list-with-out-pagination-end
