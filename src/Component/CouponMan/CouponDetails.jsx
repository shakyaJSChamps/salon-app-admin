import React from "react";
import { useState } from "react";
import { MdOutlineConfirmationNumber } from "react-icons/md";
import { Paper } from "@mui/material";
import DataTable from "react-data-table-component";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import CustomTitle from "../CustomTitle";

const CouponDetails = (props) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 15;
  // const handleChangePage = (newPage) => {
  //   setPage(newPage);
  // };

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
          <Paper className="about-coupons-details ps-2" elevation={8}>
            <div className="align-ite-center-start">
              <div className="border-text">
                <p className="vertical-text">{row.discount}</p>
              </div>
              <div className="fw-bold"> {row.title}</div>
              <div className="coupon-saving"> {row.saving}</div>
              <div className="about-coupon-details mt-2"> {row.details}</div>
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
  const customStyles = {
    rows: {
      style: {
        minHeight: "130px",
      },
    },
  };
  return (
    <Paper className="coupon-service-paper px-3 " elevation={3}>
      <DataTable
        title={
          <CustomTitle
            icon={<MdOutlineConfirmationNumber />}
            title={"Coupon"}
          />
        }
        columns={columns}
        data={slicedData}
        pagination
        highlightOnHover
        customStyles={customStyles}
      />
    </Paper>
  );
};

export default CouponDetails;
