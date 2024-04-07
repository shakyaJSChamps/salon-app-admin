import React from "react";
import { useState } from "react";
import { MdOutlineConfirmationNumber } from "react-icons/md";
import { Paper } from "@mui/material";
import DataTable from "react-data-table-component";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

const CouponDetails = (props) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 3;
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const paginatedData = props.data || [];
  const totalRows = paginatedData.length;
  
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const slicedData = paginatedData.slice(startIndex, endIndex);
  const columns = [
    {
      name: <strong>COUPONS</strong>,
      cell: (row) => (
        <div className="mt-1 mb-2 position-relative">
          <Paper className ="about-coupons-details ps-2" elevation={8}>
            <div className="align-ite-center-start">
            <div className='border-text'><p className='vertical-text'>{row.discount}</p></div>
        <div className="fw-bold"> {row.title}</div>
         <div className="coupon-saving">   {row.saving}</div>
       <div className="about-coupon-details mt-2">  {row.details}</div>
       </div>
          </Paper>
      
        </div>
      ),
    },
    {},
    {
      name: <strong>DISCOUNT</strong>,
      cell: (row) => <div className="add-coupon-discount">{row.discount}</div>,
    },
    {
      name: <strong>DURATION</strong>,
      cell: (row) => (
        <div className="mt-4  add-coupon-duration">
          {row.start}
          <br />
          {row.startDate}
          <br />

          <p className="add-coupon-expire">
            {row.expire}
            <br />
            {row.expireDate}
          </p>
        </div>
      ),
    },

    {
      name: "",
      cell: (row) => (
        <div>
          <MdEditSquare className="me-2" />
          <RiDeleteBin6Fill />
        </div>
      ),
    },
  ];
  return (
    <Paper className="coupon-service-paper px-3 pb-3" elevation={3}>
      <div className="d-flex align-items-center justify-content-between pt-2">
        <div className="d-flex align-items-center">
          <MdOutlineConfirmationNumber className="coupon-icon"/>
          <p className=" ps-1 fw-bold  mb-0">Coupon</p>
        </div>
        <div className="d-flex align-items-center">
          <div className="search-box d-flex me-5">
            <input
              type="text"
              placeholder="Search"
              className="ps-2 search-details"
            />

            <button className="category-btn">Category</button>
          </div>
        </div>
      </div>
      <hr />

      <DataTable columns={columns} data={slicedData} />
      <hr />
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <p className="ps-3">Showing {page} of 10 pages</p>
        </div>
        <div className="d-flex align-items-center me-5">
          <button
            className="me-1 btn-previous"
            disabled={page === 1}
            onClick={() => handleChangePage(page - 1)} >
            Previous
          </button>
          <button
            className={`show-page-no me-1 ${page === page ? "active-page" : ""}`}>
            {page}
          </button>

          <button
            className={`show-page-no me-1 ${page === "" ? "active-page" : ""}`} >
            {page + 1}
          </button>
          <button
            className="btn-previous"
            disabled={endIndex >= paginatedData.length}
            onClick={() => handleChangePage(page + 1)}>
            Next
          </button>
        </div>
      </div>
    </Paper>
  );
};

export default CouponDetails;
