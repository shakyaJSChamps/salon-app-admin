import React from "react";
import { useState } from "react";
import { MdOutlineContactMail } from "react-icons/md";
import { Paper } from "@mui/material";
import DataTable from "react-data-table-component";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import PlayCircleOutlineSharpIcon from "@mui/icons-material/PlayCircleOutlineSharp";
const ServiceADS = (props) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 3;
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const paginatedData = props.data || [];
  const totalRows = paginatedData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const slicedData = paginatedData.slice(startIndex, endIndex);
  const columns = [
    {
      name: <strong>NAME</strong>,
      cell: (row, index) => (
        <div className="mt-1 mb-2 position-relative image-title">
          {row.title}
          <img src={row.image} alt="Audio Image" className="audio-image" />
          {index > 0 && index % 2 === 1 && (
            <PlayCircleOutlineSharpIcon
              className="play-icon"
              style={{ height: "40px", width: "40px" }}
            />
          )}
        </div>
      ),
    },
    {},
    {
      name: <strong>CITY</strong>,
      cell: (row) => <div className="ads-city">{row.city}</div>,
    },
    {
      name: <strong>DURATION</strong>,
      cell: (row) => (
        <div className="mt-4  ads-duration">
          {row.start}
          <br />
          {row.startDate}
          <br />

          <p className="expire-text">
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
    <Paper className="ads-service-paper px-3 pb-3" elevation={3}>
      <div className="d-flex align-items-center justify-content-between pt-2">
        <div className="d-flex align-items-center">
          <MdOutlineContactMail />
          <p className=" ps-1 fw-bold  mb-0">Advertisement</p>
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
            className={`show-page-no me-1 ${page === page ? "active" : ""}`}>
            {page}
          </button>

          <button
            className={`show-page-no me-1 ${page === "" ? "active" : ""}`} >
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

export default ServiceADS;
