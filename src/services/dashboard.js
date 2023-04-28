import axios from "@axios/axiousConfig";

// Get-dashboard-analytics-start
export const getDashboardAnalyticsApi = async (data) => {
  //endPoint
  const endPoint = "/dashboard/analytics/count";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On get dashboard analytics API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// Get-dashboard-analytics-end

// Sales-and-Expense-start
export const salesAndexpenseGraphApi = async (data) => {
  //endPoint
  const endPoint = "/dashboard/graph/salesAndexpense";
  try {
    const response = await axios.post(endPoint, data);
    return response;
  } catch (error) {
    console.log("ERROR On dashboard/graph/salesAndexpense API:", error);
    if (error.response) {
      return error.response;
    }
  }
};
// Sales-and-Expense-end
