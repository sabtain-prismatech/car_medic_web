import React, { useEffect, useState } from "react";
// Components
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import PageSelection from "@components/PageSelection";
import CreateExpenseModel from "@components/Model/CreateExpense";
// config
import staticData from "@config/config.json";
// services
import { expenseListApi } from "@services/expense";

export default function Main() {
  const [expenseList, setExpenseList] = useState([]);
  const [createModel, setCreateModel] = useState(false);
  const [updateExpenseList, setUpdateExpenseList] = useState(false);
  console.log(expenseList);
  const [search, setSearch] = useState("");
  const [selectedpage, setSelectedpage] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(1);

  // get-all-vehicle-API-start
  const getExpenseList = async () => {
    const params = {
      title: search,
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
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search Expense"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button
            type="button"
            className="ms-3"
            onClick={() => setCreateModel(true)}
          >
            Add Expense
          </button>
        </div>
        <Table theading={staticData.expenseTableHeadings}>
          {expenseList?.expenses?.map((val, index) => (
            <tr key={index}>
              <td className="border">{index + 1}</td>
              <td className="border">{val?.title || ""}</td>
              <td className="border">{val?.amount || ""}</td>
              <td className="border">{val?.description || "N/A"}</td>
              <td className="border">{val?.createdAt}</td>
            </tr>
          ))}
        </Table>
      </div>

      <div className="mt-5">
        <Pagination
          pageCount={Number(expenseList?.pages)}
          selectedpage={(value) => setSelectedpage(value)}
        />
        <PageSelection dataPerPage={(value) => setDataPerPage(value)} />
      </div>
    </>
  );
}
