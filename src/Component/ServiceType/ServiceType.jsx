import React, { useEffect, useState } from "react";
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
<<<<<<< Updated upstream
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: "sweet-alert ",
=======
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: "custom-swal" // Add your custom CSS class here
>>>>>>> Stashed changes
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
          {isValidImageUrl(row.imageUrl) && isValidImageUrl(row.imageUrl) ? (
            <img
              src={row.imageUrl}
              alt="Profile"
              style={{ width: 35, height: 35, borderRadius: "50%" }}
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
      cell: (row) => <FDate date={row.createAt} formatStr="dd/MM/yyyy" />,
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
  };

  return (
    <>
      <Paper className="add-service-paper  pb-3 rounded h-100" elevation={3}>
        {services.length >= 0 ? (
          <DataTable
            title={
              <CustomTitle
                icon={<MdOutlineContentPaste />}
                title={"Service Type"}
              />
            }
            data={[...services]}
            columns={columns}
            pagination
            customStyles={customStyles}
          />
        ) : (
          <span>No Data</span>
        )}
      </Paper>
    </>
  );
};

export default ServiceType;
