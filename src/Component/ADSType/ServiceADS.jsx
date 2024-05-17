import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import DataTable from "react-data-table-component";
import { MdEditSquare } from "react-icons/md";
import { MdOutlineContactMail } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import CustomTitle from "../CustomTitle";
import { getAdsManagement } from "../../api/account.api";
import { isValidImageUrl } from "../../constants";
import Profile from "../../assets/image/dummy-profile.jpg";
import NewADS from "./NewADS";

const ServiceADS = (props) => {
  console.log("All Data ::>", props);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 15;
  const [selectedRow, setSelectedRow] = useState(null);
  const [showNewADS, setShowNewADS] = useState(false);

  const handleEditClick = (row) => {
    console.log("Edit clicked for row:", row);
    setSelectedRow(row);
    setShowNewADS(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAdsManagement();
        console.log("Ads Management Response:", response);
        setData(response.data.data);
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
      minWidth: "200px",
      cell: (row, index) => (
        <div className="mt-1 mb-2 position-relative image-title">
          {row.name}
          <div className="d-flex justify-content-center align-items-center">
            {isValidImageUrl(row.imageUrl) && isValidImageUrl(row.imageUrl) ? (
              <img
                src={row.imageUrl}
                alt="Profile"
                style={{ width: "100%", height: "100%", borderRadius: "5px" }}
              />
            ) : (
              <img
                src={Profile}
                alt="Profile"
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        </div>
      ),
    },
    {
      name: <strong>CITY</strong>,
      cell: (row) => <div className="ads-city">{row.city}</div>,
    },
    {
      name: <strong>DURATION</strong>,
      cell: (row) => (
        <div className="mt-4 ads-duration">
          <div>
            Starts
            <br /> {new Date(row.startDate).toLocaleDateString()}
          </div>
          <p className="expire-text">
            Expire on {new Date(row.endDate).toLocaleDateString()}
          </p>
        </div>
      ),
    },

    {
      name: "",
      cell: (row) => (
        <div>
          <MdEditSquare
            className="me-2"
            onClick={() => handleEditClick(row)}
            style={{ cursor: "pointer" }}
          />
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
        selectedRow={selectedRow}
      />
      {showNewADS && (
        <NewADS
          selectedRow={selectedRow}
          showNewADS={showNewADS}
          setShowNewADS={setShowNewADS}
        />
      )}
    </Paper>
  );
};

export default ServiceADS;
