// import { GrFormUpload } from "react-icons/gr";
// import style from './controls.module.css'
import { useState } from "react";
// import { ErrorMessage } from "formik";
export default function InputFile({ onFileSelect, name, ...rest }) {

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
            <div>
                <button type="button" onClick={handleOnClick}
                    style={{
                        padding: '3px 20px',
                        backgroundColor: '#000',
                        color: '#fff',
                        border: '2px solid #909090',
                        borderRadius: '12px',
                        marginTop: '10px',
                        fontSize: '11px'}}
                            >
                            Add
                </button>
            <input type='file' name={name} {...rest} style={{ display: "none" }} onChange={handleFileChange} />
        </div>
        </div >
    )
}

