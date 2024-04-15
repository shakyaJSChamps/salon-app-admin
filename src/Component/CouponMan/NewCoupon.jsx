import React from "react";
import { Row } from "react-bootstrap";
import { Paper } from "@mui/material";
import { MdOutlineConfirmationNumber } from "react-icons/md";

const NewCoupon = () => {
  return (
    // <Row className="coupon ">
      <Paper className="coupon-service-paper px-3 mb-3 h-100">
        <div className="d-flex align-items-center ">
          <MdOutlineConfirmationNumber  />
          <p className="ps-1 fw-bold mb-0 "> Create New Coupon</p>
        </div>
        <hr className="mt-4" />
        <div className="coupon-form">
          <form>
            {/* <label className=''>
            Coupon Name<br/>
            <input type="text" name="coupon name"  className='form-control input' />
          </label> */}
            <div className="d-flex flex-column align-items-start">
              <label className="fw-bold">coupon Name</label>
              <input className="form-control input" />
            </div>
            {/* <label>
            Coupon Sub Name
            <input type="text" name="coupon sub name" className='form-control input' />
          </label> */}
            <div className="d-flex flex-column align-items-start ">
              <label className="fw-bold">Coupon Sub Name</label>
              <input className="form-control input" />
            </div>
            {/* <label>
              Coupon Description
              <br />
              <textarea
                type="text"
                name="description"
                className="form-control input"
                rows="2"
                cols="21"
              />
            </label> */}
            <div className="d-flex flex-column align-items-start">
              <label className="fw-bold"> Coupon Description</label>
              <textarea
                className="form-control input"
                rows="3"
                cols="25"
              ></textarea>
            </div>
            {/* <label>
              Coupon Discount
              <input
                type="text"
                name="coupon discount"
                className="form-control input"
              />
            </label> */}
            <div className="d-flex flex-column align-items-start">
              <label className="fw-bold">Coupon Discount</label>
              <input className="form-control input" />
            </div>
            {/* <label>
              Start Date
              <br />
              <input
                type="text"
                name="start"
                placeholder="07/07/43"
                className="form-control input"
              />
            </label> */}
            <div className="d-flex flex-column align-items-start ">
              <label className="fw-bold">Start Date</label>
              <input
                className="form-control input"
                type="text"
                name="start"
                placeholder="07/07/43"
              />
            </div>

            {/* <label>
              End Date <br />
              <input type="text" name="end" className="form-control input" />
            </label> */}
            <div className="d-flex flex-column align-items-start ">
              <label className="fw-bold">End Date</label>
              <input className="form-control input" />
            </div>
            <div className="d-flex justify-content-center coupon-btn">
              <button className=" button pt-1 ">ADD COUPON</button>
            </div>
          </form>
        </div>
      </Paper>
    // </Row>
  );
};

export default NewCoupon;
