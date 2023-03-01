import axios from "@axios/axiousConfig";

// Create-expense-API-start
export const createExpenseApi = async (data) => {
  //endPoint
  const endPoint = "/expense/create";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On create expense API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// Create-expense-API-End

// expense-list-start
export const expenseListApi = async (data) => {
  //endPoint
  const endPoint = "/expense/list";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On list expense API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// expense-list-end
