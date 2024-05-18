import { useState } from "react";
export default function SalesImageUploader({ label, onFileSelect, name, buttonName, ...rest }) {

    const [imagePreview, setImagePreview] = useState(null);
    // Handle file select
    const handleOnClick = (e) => {
        e.preventDefault();
        const input = document.querySelector(`input[name=${name}]`);
        input.click();
    }

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Set image preview
            onFileSelect(file); // Call parent function to handle file select
        }
    };

    return (
        <div className='d-flex flex-column mb-1 '>
            <label htmlFor={rest.name} className="" style={{ fontWeight: 500 }}>{label}</label>
            {imagePreview && <img src={imagePreview} alt="Selected" style={{ height: '150px', width: '150px', marginBottom: '10px' }} />}
            <div>
                <button type="button" onClick={handleOnClick} className="form-control input">
                    {buttonName}
                </button>
                <input type='file' name={name} {...rest} style={{ display: "none" }} onChange={handleFileSelect} />
            </div>
        </div>
    )
}


