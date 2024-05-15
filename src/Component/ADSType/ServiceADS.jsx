import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import DataTable from "react-data-table-component";
import { MdEditSquare } from "react-icons/md";
import { MdOutlineContactMail } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import PlayCircleOutlineSharpIcon from "@mui/icons-material/PlayCircleOutlineSharp";
import CustomTitle from "../CustomTitle";
import { getAdsManagement } from "../../api/account.api";

const ServiceADS = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAdsManagement();
        console.log("Ads Management Response:", response.data); 
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const totalRows = data.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const slicedData = data.slice(startIndex, endIndex);

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

  const customStyles = {
    rows: {
      style: {
        minHeight: "125px",
      },
    },
  };

  return (
    <Paper className="ads-add-paper  h-100" elevation={3}>
      <DataTable
        title={
          <CustomTitle
            icon={<MdOutlineContactMail />}
            title={"Advertisement"}
          />
        }
        columns={columns}
        data={slicedData}
        pagination
        highlightOnHover
        customStyles={customStyles}
        onChangePage={handleChangePage}
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={rowsPerPage}
        paginationRowsPerPageOptions={[15, 25, 50, 100]}
      />
    </Paper>
  );
};

export default ServiceADS;
