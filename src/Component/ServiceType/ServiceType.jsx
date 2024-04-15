import React, { useEffect, useState } from "react";
import { MdOutlineContentPaste } from "react-icons/md";
import Swal from 'sweetalert2';
import { getServiceType, deleteServiceType } from "../../api/account.api";
import Notify from "../../utils/notify";
import { Paper, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import DataTable from "react-data-table-component";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import FDate from "../controls/FDate";

const ServiceType = (props) => {
  const [services, setServices] = useState([]);
  const [initialFetch, setInitialFetch] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this salon type',
      icon: 'warning',
      width:"30%",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: "sweet-alert " 
      
      
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

      setServices((prevServices) => prevServices.filter((service) => service.id !== row.id));
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
      name: "Description",
      sortable: true,
      cell: (row) => (row.description ? row.description : "Description Not Found"),
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

  return (
    <>
      <Paper className="add-service-paper px-3 pb-3 rounded h-100" elevation={3}>
        <div className="d-flex align-items-center pt-2">
          <MdOutlineContentPaste />
          <p className="ps-1 fw-bold mb-0">Service Type</p>
        </div>
        <hr />
        {services.length >= 0 ? (
          <DataTable data={[...services]} columns={columns} pagination />
        ) : (
          <span>No Data</span>
        )}
      </Paper>
    </>
  );
};

export default ServiceType;
