import { useState } from "react";
export default function SalesImageUploader({ label, onFileSelect, name, ...rest }) {

    const [file, setFile] = useState("");

    const handleOnClick = (e) => {
        e.preventDefault();
        const input = document.querySelector(`input[name=${name}]`);
        input.click();
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
        onFileSelect(file)
    };

    return (
        <div className='d-flex flex-column mb-1 '>
            <label htmlFor={rest.name} className="" style={{ fontWeight: 500 }}>{label}</label>
            <div>
                <button type="button" onClick={handleOnClick} className="form-control input">
                    Upload
                </button>
                <input type='file' name={name} {...rest} style={{ display: "none" }} onChange={handleFileChange} />
                <small className="p-2">{file?.name}</small>
            </div>
        </div>
    )
}

