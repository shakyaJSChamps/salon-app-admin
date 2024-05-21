import React, { useState } from 'react';
import Notify from "../../../utils/notify";
import { fileUploaders, updateImage } from '../../../api/account.api';
import InputFile from '../Inputfile/InputFile';

function ImageUpdate({ name, onImageUpload, buttonName, buttonStyle, inputClassName }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleOnFileSelect = async (file) => {
        setIsLoading(true);
        try {
            const response = await fileUploaders({ fileName: file.name });
            const requestOptions = {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                },
            };
            await fetch(response.data.data.url, requestOptions);
            let imagePath = response.data.data.path;
            onImageUpload(imagePath);
        } catch (error) {
            console.error('Error uploading image:', error);
            Notify.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <InputFile
            name={name}
            onFileSelect={handleOnFileSelect}
            buttonName={buttonName}
            buttonStyle={buttonStyle}
            inputClassName={inputClassName}
            disabled={isLoading}
        />
    );
}

export default ImageUpdate;
