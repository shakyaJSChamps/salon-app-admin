import { useState } from "react";

export default function InputFile({ buttonName, onFileSelect, name, buttonStyle, inputClassName, ...rest }) {
    const [file, setFile] = useState("");

    const handleOnClick = (e) => {
        e.preventDefault();
        const input = document.querySelector(`input[name=${name}]`);
        input.click();
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
        onFileSelect(file);
    };

    return (
        <div className='d-flex flex-column mb-1 '>
            <div>
                <button type="button" onClick={handleOnClick}
                    style={buttonStyle}
                    className={inputClassName}
                >
                    {buttonName}
                </button>
                <input type='file' name={name} {...rest} style={{ display: "none" }} onChange={handleFileChange} />
            </div>
        </div>
    )
}
