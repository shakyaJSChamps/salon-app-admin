import React, { useState } from "react";
import { Paper } from "@mui/material";
import DataTable from "react-data-table-component";
import { MdEditSquare } from "react-icons/md";
import { MdOutlineContactMail } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2"; 
import CustomTitle from "../CustomTitle";
import { isValidImageUrl } from "../../constants";
import Profile from "../../assets/image/dummy-profile.jpg";
import { deleteADSType } from "../../api/account.api"; 
import Notify from "../../utils/notify"; 

const ServiceADS = ({ adsData, onEditRow, onDeleteRow }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 15;

  const handleEditClick = (row) => {
    console.log("Edit clicked for row:", row);
    onEditRow(row);
  };

  const handleDeleteClick = async (id) => {
    console.log("Delete clicked for ID:", id); 
    try {
      const response = await deleteADSType(id); 
      console.log("Delete API Response:", response); 
      Notify.success("Advertisement deleted successfully.");
      onDeleteRow(id); 
    } catch (error) {
      console.error("Delete API Error:", error); 
      Notify.error("Failed to delete the advertisement.");
    }
  };

  const handleDeleteConfirmation = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Advertisement deleted successfully",
      icon: "warning",
      width: "30%",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: "custom-swal",
      allowOutsideClick: false, // Prevent closing on outside click
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteClick(row.id);
      }
    });
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const totalRows = adsData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const slicedData = adsData.slice(startIndex, endIndex);

  const columns = [
    {
      name: <strong>NAME</strong>,
      minWidth: "200px",
      cell: (row) => (
        <div className="mt-1 mb-2 position-relative image-title">
          {row.name}
          <div className="d-flex justify-content-center align-items-center">
            {isValidImageUrl(row.mediaUrl) ? (
              <img
                src={row.mediaUrl}
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
          <RiDeleteBin6Fill
            onClick={() => handleDeleteConfirmation(row)}
            style={{ cursor: "pointer" }}
          />
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
    <Paper className="ads-add-paper h-100" elevation={3}>
      <DataTable
        title={
          <CustomTitle
            icon={<MdOutlineContactMail />}
            title={"Advertisement"}
            options={[
              { text: "Email", value: "email" },
              { text: "Mobile Number", value: "phoneNumber" },
            ]}
            disabled={true}
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
