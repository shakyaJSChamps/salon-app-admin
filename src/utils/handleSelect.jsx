import { useState } from "react";
// export default function handleSelect({ onFileSelect }) {

const [imagePreview, setImagePreview] = useState(null);
// Handle file select
export const handleOnClick = (e) => {
    e.preventDefault();
    const input = document.querySelector(`input[name=${name}]`);
    input.click();
}

export const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
        setImagePreview(URL.createObjectURL(file)); // Set image preview
        onFileSelect(file); // Call parent function to handle file select
    }
};

return (
    <div>
        {imagePreview && <img src={imagePreview} alt="Selected" style={{ height: '150px', width: '150px', marginBottom: '10px' }} />}
    </div>
)
