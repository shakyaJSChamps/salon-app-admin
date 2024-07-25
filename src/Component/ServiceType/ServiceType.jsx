import React, { useState, useEffect } from "react";
import { MdOutlineContentPaste } from "react-icons/md";
import Swal from "sweetalert2";
import { getServiceType, deleteServiceType } from "../../api/account.api";
import Notify from "../../utils/notify";
import {
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import DataTable from "react-data-table-component";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import FDate from "../controls/FDate";
import CustomTitle from "../CustomTitle";
import Profile from "../../assets/image/dummy-profile.jpg";
import { isValidImageUrl } from "../../constants";
import CommonImage from "../common-component/CommonImage";
import { JoinedDate } from "../common-component/Formatdate/Joinedondate";

const ServiceType = (props) => {
  const [services, setServices] = useState([]);
  const [initialFetch, setInitialFetch] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedOption, setSelectedOption] = useState("email");

  const getServiceTypes = async () => {
    try {
      const response = await getServiceType();
      const responseData = response.data.data;
      setServices(responseData);
      props.setServiceAdded(false);
    } catch (error) {
      Notify.error(error.message);
    }
  };

  useEffect(() => {
    getServiceTypes();
  }, []);

  useEffect(() => {
    if (props.serviceAdded) {
      getServiceTypes();
    }
  }, [props.serviceAdded]);

  const handleDeleteConfirmation = (row) => {
    setSelectedRow(row);
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this salon type",
      icon: "warning",
      width: "30%",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: "custom-swal",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(row);
      }
    });
  };

  const handleDelete = async (row) => {
    try {
      await deleteServiceType(row.id);
      Notify.success("Service type deleted successfully");

      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== row.id)
      );
    } catch (error) {
      Notify.error(error.message);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Image",
      sortable: true,
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center">
          {isValidImageUrl(row.imageUrl) ? (
            <CommonImage 
            imageUrl={row.imageUrl}
            alt="Service Image"
            classes="service-image"
          />
          ) : (
            <CommonImage
              src={Profile}
              alt="Profile"
              classes="service-image"
            />
          )}
        </div>
      ),
    },
    {
      name: "Status",
      sortable: true,
      cell: (row) => (row.active ? "Active" : "Inactive"),
    },
    {
      name: "Created Date",
      sortable: true,
      width: "150px",
      cell: (row) => <div>
        {JoinedDate(row.createAt)}
      </div>,
    },
    {
      name: "",
      cell: (row) => (
        <>
          <MdEditSquare
            className="me-2 cursor-pointer"
            onClick={() => props.onEdit(row)}
          />
          <RiDeleteBin6Fill
            className="cursor-pointer"
            onClick={() => handleDeleteConfirmation(row)}
          />
        </>
      ),
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontSize: "16px",
        textTransform: "uppercase",
      },
    },
    rows: {
      style: {
        fontSize: "16px",
        minHeight: "70px",
        color: "#6F6B7D",
        fontFamily: "Poppins",
      },
    },
  };

  return (
    <>
      <Paper className="add-service-paper  rounded h-100" elevation={3}>
        <div className="d-flex align-items-center pt-2 ps-3">
          <MdOutlineContentPaste className="fs-3"/>
          <p className=" font ps-1  mb-0" >Service Type</p>
        </div>
        <hr />
        {services.length > 0 ? (
          <DataTable
            data={services}
            columns={columns}
            customStyles={customStyles}
            pagination
            highlightOnHover
          />
        ) : (
          <span>No Data</span>
        )}
      </Paper>
    </>
  );
};

export default ServiceType;

