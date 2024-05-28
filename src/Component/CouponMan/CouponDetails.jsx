import React, { useEffect, useState } from "react";
import { MdOutlineConfirmationNumber, MdEditSquare } from "react-icons/md";
import { Paper } from "@mui/material";
import Swal from "sweetalert2"; 
import DataTable from "react-data-table-component";
import { RiDeleteBin6Fill } from "react-icons/ri";
import CustomTitle from "../CustomTitle";
import CommonImage from "../common-component/CommonImage";
import { deleteCouponType } from "../../api/account.api";
import Notify from "../../utils/notify";

const CouponDetails = ({ onEditCoupon, couponData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(couponData);
  }, [couponData]);

  const handleDeleteConfirmation = (row) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Coupon deleted successfully",
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
        deleteCoupon(row); 
      }
    });
  };
  

  const deleteCoupon = async (coupon) => {
    try {
      if (!coupon || !coupon.ID) {
        throw new Error("Invalid coupon data");
      }

      await deleteCouponType(coupon.ID);
      Notify.success("Coupon deleted successfully.");

      // Update the data state to remove the deleted coupon
      setData((prevData) => prevData.filter((item) => item.ID !== coupon.ID));
    } catch (error) {
      Notify.error(`Failed to delete coupon: ${error.message}`);
    }
  };

  const columns = [
    {
      name: <strong>COUPONS</strong>,
      minWidth: "200px",
      cell: (row) => (
        <div className="mt-1 mb-2 position-relative image-title">
          {row.name}
          <div className="d-flex justify-content-center align-items-center">
            <CommonImage
              imageUrl={row.imageUrl}
              alt="Coupon Image"
              classes="coupon-image"
            />
          </div>
        </div>
      ),
    },
    {
      name: <strong>DESCRIPTION</strong>,
      minWidth: "200px",
      cell: (row) => (
        <div className="coupon-description">{row.description}</div>
      ),
    },
    {
      name: <strong>DISCOUNT</strong>,
      minWidth: "200px",
      cell: (row) => (
        <div className="add-coupon-discount">{row.discountDetails}</div>
      ),
    },
    {
      name: <strong>DURATION</strong>,
      minWidth: "200px",
      cell: (row) => (
        <div className="mt-4 ads-duration">
          <div>
            Starts
            <br /> {new Date(row.startDate).toLocaleDateString()}
          </div>
          <p className="expire-text">
            Expire on <br /> {new Date(row.endDate).toLocaleDateString()}
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
            onClick={() => onEditCoupon(row)}
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
        minHeight: "130px",
      },
    },
  };

  return (
    <Paper className="coupon-service-paper px-3 h-100" elevation={3}>
      <DataTable
        title={
          <CustomTitle
            icon={<MdOutlineConfirmationNumber />}
            title={"Coupon"}
            disabled={true}
            options={[
              { text: "Email", value: "email" },
              { text: "Mobile Number", value: "phoneNumber" },
            ]}
          />
        }
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        customStyles={customStyles}
        noDataComponent={<div>No records to display</div>}
      />
    </Paper>
  );
};

export default CouponDetails;
