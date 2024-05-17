import React, { useState } from 'react';
import Notify from "../../../utils/notify";
import { fileUploaders, updateImage } from '../../../api/account.api';
import InputFile from '../../../../Controls/InputFile';

function ImageUpdate({ name, onImageUpload , buttonName }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleOnFileSelect = async (file) => {
        // Indicate upload in progress
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
        }
    };

    return (
        <InputFile
            name={name}
            onFileSelect={handleOnFileSelect}
            buttonName={buttonName}
            disabled={isLoading}
        />
    );
}

export default ImageUpdate;
