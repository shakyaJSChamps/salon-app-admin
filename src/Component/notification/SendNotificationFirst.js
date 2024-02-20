import { Paper, Checkbox, FormControlLabel } from '@mui/material';
import { IoMdNotifications } from "react-icons/io";
import React from 'react';

const SendNotificationFirst = () => {
  return (
    <Paper className="send-Notifi-first-paper px-3 pb-3 rounded" elevation={3}>
      <div className="d-flex align-items-center pt-2">
        <IoMdNotifications />
        <p className="ps-1 fw-bold mb-0">Send Notification</p>
      </div>
      <hr />
      <form >
        <div className="d-flex flex-column align-items-start mb-1">
          <label className="fw-bold">Notification Text</label>
          <textarea
            className="form-control input mt-3"
            rows="10"
            cols="35"
          ></textarea>
        </div>
        <div className="d-flex flex-column align-items-start mb-1 ps-3">
          <label className="mt-3">Select User Type</label>
          <FormControlLabel
            control={<Checkbox id="all-consumer" />}
            label="All Consumer"
          />
          <FormControlLabel
            control={<Checkbox id="all-saloon" />}
            label="All Saloon"
          />
          <FormControlLabel
            control={<Checkbox id="all-freelance" />}
            label="All Freelance"
          />
        </div>
        <div className="d-flex justify-content-center">
        <button type="submit" className="button mt-4">
         Send
        </button>
      </div>
      </form>
    </Paper>
  )
};

export default SendNotificationFirst;
