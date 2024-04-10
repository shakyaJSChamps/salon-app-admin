import React from 'react'
import { GrFormUpload } from "react-icons/gr";
import { fileUploader } from "../../../../api/account.api";
import { useState, useEffect, useRef } from 'react';
import { Form, Formik, Field, ErrorMessage } from "formik";
import styles from "../Salonownerdetails/Salonownerdetails.module.css";


function SalonOwnerDetails() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState("");
  console.log("url:::>", url);
  const [fileName, setFileName] = useState("");
  useEffect(() => { }, []);
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
      <h4>Salon Owner Details</h4>
      <Formik
      // onSubmit={onSubmit}
      >
        <Form>
          <label className={styles.label}> First Name</label><br />
          <Field
            type='text'
            placeholder='Jhon'
            name='firstName'
            className={`${styles.input} px-1 rounded`}
          /><br />

          {/* <ErrorMessage name="firstName" className={styles.formError} component="div" /> */}

          <label className={`${styles.label} mt-2`}> Middle Name</label><br />
          <Field
            type='text'
            placeholder='Jhon'
            name='middleName'
            className={`${styles.input} px-1 rounded`}
          /><br />

          {/* <ErrorMessage name="middleName" className={styles.formError} component="div" /> */}


          <label className={`${styles.label} mt-2`}> Last Name</label><br />
          <Field
            type='text'
            placeholder='Jhon'
            name='lastName'
            className={`${styles.input} px-1 rounded`}
          /><br />

          {/* <ErrorMessage name="lastName" className={styles.formError} component="div" /> */}

          <label className={`${styles.label} mt-2`} > Email ID</label><br />
          <Field
            type='email'
            placeholder='Jhon'
            name='email'
            className={`${styles.input} px-1 rounded`}
          /><br />

          {/* <ErrorMessage name="email" className={styles.formError} component="div" /> */}

          <label className={`${styles.label} mt-2`}> Date of Birth</label><br />
          <Field
            type='date'
            placeholder='Jhon'
            name='dob'
            className={`${styles.input} px-1 rounded`}
          /><br />

          {/* <ErrorMessage name="dob" className={styles.formError} component="div" /> */}

          <label className={`${styles.label} mt-2`}>
            Gender
            <br />
            <Field
              as="select"
              name="gender"
              className={`${styles.input} px-1 rounded`}
            >
              <option value="">select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Field><br />

            {/* <ErrorMessage name="gender" className={styles.formError} component="div" /> */}
          </label><br />

          <div className={styles.aadhar}>
            <label className={`${styles.front} mt-2 fw-bold`}>
              <span>Aadhar Front</span>
              <br />
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
            </label><br />

            <label className={`${styles.back} mt-2 fw-bold`}>
              Aadhar Back<br />
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
            </label>

          </div>

          <label className={`${styles.lab} mt-2 fw-bold`}>
            Pan Card
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
          </label><br />

          <button type='submit' className={styles.btn}>Edit</button>
          <button type='submit' className={styles.btn}>Save</button>
        </Form>
      </Formik>
    </>
  )
}

export default SalonOwnerDetails
