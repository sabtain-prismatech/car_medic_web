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

// get-sales-history-list-start
export const getSalesHistoryListApi = async (data) => {
  //endPoint
  const endPoint = "/product/sale/history/list";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On get-sales-history-list API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// get-sales-history-list-end

// Create-Product-start
export const createProductApi = async (data) => {
  //endPoint
  const endPoint = "/product/buy/create";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On create product API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// Create-Product-end

// Create-Sale-Product-start
export const createSaleProductApi = async (data) => {
  //endPoint
  const endPoint = "/product/sale/create";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On create sale product API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// Create-Sale-Product-end

// Return-Product-start
export const returnProductApi = async (data) => {
  //endPoint
  const endPoint = "/product/return";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On return  product API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// Return-Product-end
