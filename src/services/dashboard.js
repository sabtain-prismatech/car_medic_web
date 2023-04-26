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
