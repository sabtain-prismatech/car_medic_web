import React, { useEffect, useState } from "react";
// Components
import DashboardLayout from "@components/DashboardLayout";
import Typography from "@components/SharedComponents/Typography";
import CardOne from "./Component/CardOne";
import CardTwo from "./Component/CardTwo";
import UserDoughnutChart from "./Component/DoughnutChart";
import SalesLineChart from "./Component/SalesLineChart";
// style
import "@styles/scss/dashboard.scss";
// Images
import Images from "@helper/images";
import graphOrange from "@assets/images/svgs/graph-line-orange.svg";
import graphGreen from "@assets/images/svgs/graph-line-green.svg";
import graphBlue from "@assets/images/svgs/graph-line-blue.svg";
import graph from "@assets/images/svgs/graph-line.svg";
import products from "@assets/images/svgs/products.svg";
import services from "@assets/images/svgs/services.svg";
import lineBar from "@assets/images/svgs/line-bar.svg";
// Icons
import icons from "@helper/icons";
// services
import { getDashboardAnalyticsApi } from "@services/dashboard";

export default function Dashboard() {
  const [analytics, setAnalytics] = useState({});

  const getAnalyticsFun = async () => {
    await getDashboardAnalyticsApi({}).then((response) => {
      if (response?.data?.success) {
        setAnalytics(response?.data?.data || {});
      } else {
        console.log(response?.data?.message);
      }
    });
  };

  useEffect(() => {
    getAnalyticsFun();
  }, []);

  const analyticsCardData = [
    {
      title: "Total Customers",
      amount: analytics?.totalCustomers || 0,
      icon: <icons.FaIcons.FaUserAlt />,
      graph: graphOrange,
      card: 1,
    },
    {
      title: "Total Vehicles",
      amount: analytics?.totalVehicles || 0,
      icon: <icons.FaIcons.FaCarSide />,
      graph: graphOrange,
      card: 2,
    },
    {
      title: "Total Reminder",
      amount: analytics?.totalReminders || 0,
      icon: <icons.MdIcons.MdNotificationsActive />,
      graph: graphBlue,
      card: 3,
    },
    {
      title: "Total Sale",
      amount: analytics?.totalSale || 0,
      icon: <icons.FaIcons.FaMoneyBillWave />,
      graph: graphGreen,
      card: 4,
    },
  ];

  const analyticsCardDataTwo = [
    {
      title: "Total Expense",
      amount: analytics?.totalExpense || 0,
      icon: <icons.FaIcons.FaUserAlt />,
      img: lineBar,
    },
    {
      title: "Total Profit",
      amount: analytics?.totalProfit || 0,
      icon: <icons.FaIcons.FaCarSide />,
      img: graph,
    },
    {
      title: "Total Product",
      amount: analytics?.totalProducts || 0,
      icon: <icons.MdIcons.MdNotificationsActive />,
      img: products,
    },
    {
      title: "Total services",
      amount: analytics?.totalServices || 0,
      icon: <icons.FaIcons.FaMoneyBillWave />,
      img: services,
    },
  ];

  return (
    <React.Fragment>
      <DashboardLayout title="Dashboard">
        <div className=" container-fluid dashboard-analytics-wrapper">
          <Typography variant="h2" fw="bold">
            Good Morning , <span className="primary">Nagina Autopoint</span>
          </Typography>
          <div className="row card-one-wrapper">
            {analyticsCardData?.map((val, index) => (
              <CardOne key={index} values={val} />
            ))}
          </div>
          <div className="row ">
            <div className="col-6 ">
              <div className="bg-white p-5 rounded-2">
                <Typography variant="body1" fw="bold" style="mb-4">
                  User Analytics
                </Typography>
                <div className=" w-75 mx-auto">
                  <UserDoughnutChart />
                </div>
              </div>
            </div>
            <div className="col-6 ">
              <div className="row">
                {analyticsCardDataTwo.map((val, index) => (
                  <CardTwo key={index} values={val} />
                ))}
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <div className="p-5 bg-white rounded-2">
                <SalesLineChart />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </React.Fragment>
  );
}
