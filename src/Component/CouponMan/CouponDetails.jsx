import React, { useEffect, useState } from "react";
import { MdOutlineConfirmationNumber } from "react-icons/md";
import { Paper } from "@mui/material";
import DataTable from "react-data-table-component";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import CustomTitle from "../CustomTitle";
import { getCouponManagement } from "../../api/account.api";
import { isValidImageUrl } from "../../constants";
import Profile from "../../assets/image/dummy-profile.jpg"; 

const CouponDetails = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const rowsPerPage = 15;

  const fetchCoupons = async (page) => {
    try {
      const response = await getCouponManagement();
      console.log("ALL Coupon Management ::>", response);
      setData(response.data.data || []); 
      setTotalRows(response.data.data.total || 0);
    } catch (error) {
      console.error("Error fetching coupon data:", error);
    }
  };

  useEffect(() => {
    fetchCoupons(page);
  }, [page]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const columns = [
    {
      name: <strong>COUPONS</strong>,
      minWidth: "200px",
      cell: (row) => (
        <div className="mt-1 mb-2 position-relative image-title">
          {row.name}
          <div className="d-flex justify-content-center align-items-center">
            {isValidImageUrl(row.imageUrl) ? (
              <img
                src={row.imageUrl
                }
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
      name: <strong>DESCRIPTION</strong>,
      minWidth: "200px",
      cell: (row) => <div className="coupon-description">{row.description}</div>,
    },
    {
      name: <strong>DISCOUNT</strong>,
      minWidth: "200px",
      cell: (row) => <div className="add-coupon-discount">{row.discountDetails}</div>,
    },
    {
      name: <strong>DURATION</strong>,
      // minWidth: "200px",
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
    <Paper className="coupon-service-paper px-3 h-100" elevation={3}>
      <DataTable
        title={
          <CustomTitle
            icon={<MdOutlineConfirmationNumber />}
            title={"Coupon"}
            disabled={true}
          />
        }
        columns={columns}
        data={data}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handleChangePage}
        highlightOnHover
        customStyles={customStyles}
        noDataComponent={<div>No records to display</div>} // Adding noDataComponent
      />
    </Paper>
  );
};

export default CouponDetails;
