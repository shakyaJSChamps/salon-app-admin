import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Grid, Switch } from "@mui/material";
import InputText from "../../../common-component/Inputtext/InputText";
import styles from "./SaleTime.module.css";

function SaleTime({ saleTimes }) {
  console.log("Sale ::", saleTimes);
  const [timesData, setTimesData] = useState("");

  const handleToggle = (index) => {
    const updatedTimesData = [...saleTimes];
    updatedTimesData[index].isOpen = !updatedTimesData[index].isOpen;
    setTimesData(updatedTimesData);
  };

  return (
    <div>
      <div className=" d-flex justify-content-between align-items-center">
        <h4>Sale Time</h4>
      </div>
      <Formik>
        <Form>
          {!saleTimes || saleTimes.length === 0 ? (
            <div>No sale times available</div>
          ) : (
            <>
              <label className={styles.label}>Day</label>
              {saleTimes.map((time, index) => (
                <Grid container spacing={2} key={time.id} className="mb-3">
                  <Grid item xs={3}>
                    {/* <InputText label="Day" name={`day_${index}`} type="text" value={time.day} disabled className="form-control input" /> */}
                    <p className={styles.day}>{time.day}</p>
                  </Grid>

                  <Grid item xs={3}>
                    <Field
                      type="text"
                      id="startTime"
                      name={`startTime${index}`}
                      component={InputText}
                      label="Start Time"
                      value={time.startTime}
                      className="form-control input"
                      disabled={!time.isOpen}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      type="text"
                      id="endTime"
                      name={`endTime${index}`}
                      component={InputText}
                      label="End Time"
                      value={time.endTime}
                      className="form-control input"
                      disabled={!time.isOpen}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Switch
                      checked={time.isOpen}
                      onChange={() => handleToggle(index)}
                      color="default"
                      inputProps={{ "aria-label": "Toggle" }}
                    />
                  </Grid>
                </Grid>
              ))}
            </>
          )}
        </Form>
      </Formik>
    </div>
  );
}

export default SaleTime;
