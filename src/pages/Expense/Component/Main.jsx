import React, { useEffect, useState } from "react";
// Components
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import PageSelection from "@components/PageSelection";
import CreateExpenseModel from "@components/Model/CreateExpense";
import DateFilter from "@components/DateFilter";
import InputField from "@components/SharedComponents/InputField";
import Button from "@components/SharedComponents/Button";
// config
import staticData from "@config/config.json";
// services
import { expenseListApi } from "@services/expense";
// date-formatter
import dateFormat from "dateformat";
// Icons
import Icons from "@helper/icons";

export default function Main() {
  const [expenseList, setExpenseList] = useState([]);
  const [createModel, setCreateModel] = useState(false);
  const [updateExpenseList, setUpdateExpenseList] = useState(false);
  console.log(expenseList);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState({
    fromDate: dateFormat(new Date(), "yyyy-mm-dd"),
    toDate: dateFormat(new Date(), "yyyy-mm-dd"),
  });
  const [selectedpage, setSelectedpage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(5);

  // get-all-vehicle-API-start
  const getExpenseList = async () => {
    const params = {
      title: search,
      fromDate: dateFilter.fromDate,
      toDate: dateFilter.toDate,
      pageNo: selectedpage,
      perPage: Number(dataPerPage),
    };
    await expenseListApi(params).then((response) => {
      if (response?.data?.success) {
        setExpenseList(response?.data?.data);
      } else {
        console.log(response?.data?.message);
      }
    });
  };
  // get-all-vehicle-API-end

  useEffect(() => {
    if (search !== "") {
      const getData = setTimeout(() => {
        getExpenseList();
      }, 1000);
      return () => clearTimeout(getData);
    } else {
      getExpenseList();
    }
  }, [search, dataPerPage, selectedpage]);

  useEffect(() => {
    if (updateExpenseList) {
      setUpdateExpenseList(false);
      getExpenseList();
    }
  }, [updateExpenseList]);

  return (
    <>
      {createModel ? (
        <CreateExpenseModel
          show={createModel}
          onHide={() => setCreateModel(false)}
          updateExpenseList={(value) => setUpdateExpenseList(value)}
        />
      ) : (
        ""
      )}
      <div className="mt-5">
        <div className=" d-flex justify-content-end">
          <InputField
            behave="normal"
            size="md"
            type="text"
            placeholder="Search Expense"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            styles={{ width: "260px" }}
          />
          <Button
            type="button"
            size="md"
            onClick={() => setCreateModel(true)}
            startIcon={<Icons.BsIcons.BsPlusCircleFill />}
            align="ms-auto"
          >
            Add Expense
          </Button>
        </div>
        <DateFilter
          dateFilter={dateFilter}
          setDateFilter={(value) => setDateFilter(value)}
          clickEvent={getExpenseList}
        />
        <Table theading={staticData.expenseTableHeadings}>
          {expenseList?.expenses?.map((val, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{val?.title || ""}</td>
              <td>{val?.amount || ""}</td>
              <td>{val?.description || "N/A"}</td>
              <td>{val?.createdAt}</td>
              <td></td>
            </tr>
          ))}
        </Table>
      </div>

      <div className="mt-5 d-flex justify-content-between align-items-center">
        <PageSelection
          dataPerPage={(value) => setDataPerPage(value)}
          value={dataPerPage}
        />
        <Pagination
          pageCount={Number(expenseList?.pages)}
          selectedpage={(value) => setSelectedpage(value)}
        />
      </div>
    </>
  );
}
