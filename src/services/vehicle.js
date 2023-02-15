import axios from "@axios/axiousConfig";

// Create-Vehicle-API-start
export const createVehicleApi = async (data) => {
  //endPoint
  const endPoint = "/vehicle/create";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On create Vehicle API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// Create-Vehicle-API-End
