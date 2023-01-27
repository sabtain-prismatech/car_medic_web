import axios from "@axios/axiousConfig";

// Register-API-start
export const adminRegisterApi = async (data) => {
  //endPoint
  const endPoint = "/admin/register";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On Register API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// Register-API-End

// Login-API-start
export const adminLoginApi = async (data) => {
  //endPoint
  const endPoint = "/admin/login";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On Login API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// Login-API-End

// verify-token-by-admin-id-start
export const verifyAdminApi = async (data, id) => {
  //endPoint
  const endPoint = `admin/verify/${id}`;
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On Verify Token API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// verify-token-by-admin-id-end
