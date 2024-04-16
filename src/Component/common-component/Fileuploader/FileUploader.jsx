import React from 'react'
// import { Field, ErrorMessage } from 'formik'
import { useState, useEffect, useRef } from 'react';
import styles from "./Fileuploader.module.css";

const FileUploader = props => {
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

    const { label, name, ...rest } = props
    return (
        <div>
            <div>
                <label className={styles.bold} htmlFor={name}>
                    {label}
                </label><br />
                <button
                    className={`${styles.Btn} align-items-center-start form-control input`}
                    onClick={handleUploadIconClick}
                    type="button"
                >
                    <input
                        id={name}
                        type="file"
                        name={name}
                        // className={`${styles.control__input} `}
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        {...rest}
                    />
                    Upload
                </button>
            </div>
        </div>
    )
}

export default FileUploader
