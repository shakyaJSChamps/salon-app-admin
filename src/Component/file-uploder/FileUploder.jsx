import React, { useState } from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import styles from "../file-uploder/fileUploader.module.css";
import { FaTimes } from "react-icons/fa";

const Preview = ({ meta, fileWithMeta: { cancel, remove }, className }) => {
  // const handleCancel = (e) => {
  //   e.preventDefault();
  //   cancel();
  // };

  return (
    <div className={className}>
      <img
        src={meta.previewUrl}
        alt={meta.name}
        className={styles.previewImage}
      />
      {/* <div className={styles.cancelIcon} onClick={handleCancel}>
        <FaTimes />
      </div> */}
    </div>
  );
};

const MyUploader = () => {
  const [isUploading, setIsUploading] = useState(false);

  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    setIsUploading(true); // Set uploading state
    return { url: "https://httpbin.org/post" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
    if (status === "done" || status === "error") {
      setIsUploading(false); // Reset uploading state
    }
  };

  return (
    <Dropzone
      accept="image/*,audio/*,video/*"
      classNames={{
        dropzone: `${styles.customDropzone}`,
        dropzoneActive: styles.dropzoneActive,
        dropzoneReject: styles.dropzoneReject,
      }}
      PreviewComponent={Preview}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={styles.customDropzone}
        //   style={{ color: "black" }} 
        >
          <input {...getInputProps()} />
          <p className="dz-message">
            Drag 'n' drop some files here, or click to select files
          </p>
          <button className="dropzone-btn">Add Files</button>
        </div>
      )}
    </Dropzone>
  );
};

export default MyUploader;
