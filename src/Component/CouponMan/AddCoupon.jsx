import React from "react";
import { Row } from "react-bootstrap";
import { Paper } from "@mui/material";
import { Form, Formik } from 'formik'
import { MdOutlineConfirmationNumber } from "react-icons/md";
import InputText from '../common-component/Inputtext/InputText';

const AddCoupon = () => {
  return (
    // <Row className="coupon ">
    <Paper className="coupon-service-paper px-3 mb-3 h-100">
      <div className="d-flex align-items-center ">
        <MdOutlineConfirmationNumber />
        <p className="ps-1 fw-bold mb-0 "> Create New Coupon</p>
      </div>
      <hr className="mt-4" />
      <div className="coupon-form">
        <Formik>
          <Form>
            <div className="d-flex flex-column ">
              <InputText label="Coupon Name" type="text" name="coupon name" />
            </div>
            <div className="d-flex flex-column ">
              <InputText label="Coupon Sub Name" type="text" name="coupon sub name" />
            </div>
            <div className="d-flex flex-column ">
              <label className="fw-bold"> Coupon Description</label>
              <textarea
                className="form-control input"
                rows="3"
                cols="25"
              ></textarea>
            </div>
            <div className="d-flex flex-column ">
              <InputText label= "Coupon Discount" type="text" name="coupon discount" />
            </div>
            <div className="d-flex flex-column ">
              <InputText
                label= "Start Date"
                type="date"
                name="start"
              />
            </div>
            <div className="d-flex flex-column  ">
              <InputText label="End Date" type="date" name="end" />
            </div>
            <div className="d-flex justify-content-center coupon-btn mt-2">
              <button className=" button pt-1 ">ADD COUPON</button>
            </div>
          </Form>
        </Formik>
      </div>
    </Paper>
    // </Row>
  );
};

export default AddCoupon;
