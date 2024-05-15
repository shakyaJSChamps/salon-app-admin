import React, { useState } from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import styles from "../file-uploder/fileUploader.module.css";
import { FaTimes } from "react-icons/fa";

const Preview = ({ meta, fileWithMeta: { cancel, remove }, className }) => {
  return (
    <div className={className}>
      <img
        src={meta.previewUrl}
        className={styles.previewImage}
        style={{ maxHeight: "250px", maxWidth: "250px" }}
      />
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
      setIsUploading(false); 
    }
  };

  return (
    <>
      <Dropzone
        accept="image/*,audio/*,video/*"
        classNames={{
          dropzone: `${styles.customDropzone}`,
        }}
        PreviewComponent={Preview}
        inputContent={(files) => (
          <div>
            {!files.length && (
              <p className="dz-message">Drag & drop some files here</p>
            )}
          </div>
        )}
        inputWithFilesContent={() => null}
      />
      {isUploading && (
        <div>
          <button onClick={() => console.log("Submit")} className={styles.submitButton}>Submit</button>
        </div>
      )}
    </>
  );
};

export default MyUploader;
