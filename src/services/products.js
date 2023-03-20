import axios from "@axios/axiousConfig";

// get-stock-list-API-start
export const getStockListApi = async (data) => {
  //endPoint
  const endPoint = "/product/buy/list";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On get-stock-list API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// get-stock-list-API-End

// get-sales-list-API-start
export const getSalesListApi = async (data) => {
  //endPoint
  const endPoint = "/product/sale/list";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On get-sales-list API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// get-sales-list-API-End
