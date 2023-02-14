import React from "react";
// Pagination
import ReactPaginate from "react-paginate";
// React-icons
import Icons from "@helper/icons";

const Pagination = ({ pageCount, selectedpage }) => {
  const handlePageClick = (data) => {
    selectedpage(data.selected + 1);
  };
  return (
    <>
      <ReactPaginate
        previousLabel={<Icons.MdIcons.MdArrowBackIosNew />}
        nextLabel={<Icons.MdIcons.MdArrowForwardIos />}
        breakLabel={"..."}
        pageCount={Number(pageCount)}
        marginPagesDisplayed={"2"}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-link"}
        nextClassName={"page-link"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
};

export default Pagination;
