import React from 'react'
import { GrFormUpload } from "react-icons/gr";
// import { fileUploader } from "../../../../api/account.api";
import { useState, useEffect, useRef } from 'react';
import { Form, Formik, Field, ErrorMessage } from "formik";
import styles from "../Salonownerdetails/Salonownerdetails.module.css";
import { Grid } from '@mui/material';


function SalonOwnerDetails() {
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [url, setUrl] = useState("");
  // console.log("url:::>", url);
  // const [fileName, setFileName] = useState("");
  // useEffect(() => { }, []);
  const fileInputRef = useRef(null);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log("Selected File 1:", file.name);
    const fileUrl = await fileUploader({ fileName: file.name });
    console.log("fileUrl:::>", fileUrl);
    uploadFileToS3(file, fileUrl.data.url);
    // onSubmit(fileUrl);
  };
  const handleUploadIconClick = () => {
    fileInputRef.current.click();
  };

  //File Upload to S3
  const uploadFileToS3 = async (file, url) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const requestOptions = {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      };
      await fetch(url, requestOptions);
    } catch (error) {
      Notify.error("Error uploading file:", error);
    }
  };


  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h4>Salon Owner Details</h4>

        <div className='d-flex justify-content-start align-items-center mb-3'>
          <button type='submit' className={styles.btn}>Edit</button>
          <button type='submit' className={styles.btn}>Save</button>
        </div>
      </div>

      <Formik
      // onSubmit={onSubmit}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div>
                <label className={styles.label}> First Name</label><br />
                <Field
                  type='text'
                  placeholder='Jhon'
                  name='firstName'
                  className={`${styles.input} px-1 rounded`}
                /><br />

                {/* <ErrorMessage name="firstName" className={styles.formError} component="div" /> */}
              </div>
            </Grid>

            <Grid item xs={4}>
              <div>
                <label className={`${styles.label}`}> Middle Name</label><br />
                <Field
                  type='text'
                  placeholder='Jhon'
                  name='middleName'
                  className={`${styles.input} px-1 rounded`}
                /><br />

                {/* <ErrorMessage name="middleName" className={styles.formError} component="div" /> */}
              </div>
            </Grid>

            <Grid item xs={4}>
              <div>
                <label className={`${styles.label}`}> Last Name</label><br />
                <Field
                  type='text'
                  placeholder='Jhon'
                  name='lastName'
                  className={`${styles.input} px-1 rounded`}
                /><br />
                {/* <ErrorMessage name="lastName" className={styles.formError} component="div" /> */}
              </div>
            </Grid>

            <Grid item xs={4}>
              <div>
                <label className={`${styles.label}`} > Email ID</label><br />
                <Field
                  type='email'
                  placeholder='Jhon'
                  name='email'
                  className={`${styles.input} px-1 rounded`}
                /><br />

                {/* <ErrorMessage name="email" className={styles.formError} component="div" /> */}
              </div>
            </Grid>

            <Grid item xs={4}>
              <div>
                <label className={`${styles.dob}`}> Date of Birth</label><br />
                <Field
                  type='date'
                  placeholder='Jhon'
                  name='dob'
                  className={`${styles.inputDob} px-1 rounded`}
                /><br />
                {/* <ErrorMessage name="dob" className={styles.formError} component="div" /> */}
              </div>
            </Grid>

            <Grid item xs={4}>
              <div>
                <label className={`${styles.gender}`}>
                  Gender
                </label><br />
                <Field
                  as="select"
                  name="gender"
                  className={`${styles.inputGender} px-1 rounded`}
                >
                  <option value="">select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field><br />

                {/* <ErrorMessage name="gender" className={styles.formError} component="div" /> */}
              </div>
            </Grid>


            <Grid item xs={4}>
                <div className={`${styles.aadhar} d-flex align-items-center`}>
                  <label className={`${styles.front}`}>
                    <span>Aadhar Front</span>
                  </label><br />
                  <button
                    className={`${styles.Btn} align-items-center-start`}
                    onClick={handleUploadIconClick}
                    type="button"
                  >
                    <input
                      id="image"
                      type="file"
                      name="aadhar-front"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <br />
                    <GrFormUpload className={styles.uploadIcon} />
                    Upload
                  </button>
                </div>
            </Grid>

            <Grid item xs={4}>
                <div className={`${styles.aadharBack} d-flex align-items-center`} >
                  <label className={`${styles.back}`}>
                    Aadhar Back
                  </label><br />
                  <button
                    className={`${styles.Btn} align-items-center-start`}
                    onClick={handleUploadIconClick}
                    type="button"
                  >
                    <input
                      type="file"
                      name="aadhar-back"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <br />
                    <GrFormUpload className={styles.uploadIcon} />
                    Upload
                  </button>
                </div>
            </Grid>

            <Grid item xs={4}>
              <div>
                <div className={`${styles.panCard} d-flex align-items-center`} >
                  <label className={`${styles.pan}`}>
                    Pan Card
                  </label><br />
                  <button
                    className={`${styles.Btn} align-items-center-start`}
                    onClick={handleUploadIconClick}
                    type="button"
                  >
                    <input
                      type="file"
                      name="image"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <br />
                    <GrFormUpload className={styles.uploadIcon} />
                    Upload
                  </button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Form>
      </Formik >
    </>
  )
}

export default SalonOwnerDetails
