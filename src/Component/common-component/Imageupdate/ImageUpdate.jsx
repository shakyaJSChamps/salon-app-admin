import React, { useState } from 'react';
import Notify from "../../../utils/notify";
import { fileUploaders, updateImage } from '../../../api/account.api';
import InputFile from '../../../../Controls/InputFile';

function ImageUpdate({ salonDetail, setImageUrl,name, imageType }) {
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
            const updatedData = {
                imageUrl: response.data.data.path, // Use uploaded image URL
                imageType: imageType,
                thumbnailUrl: '',
            };

            const updateResponse = await updateImage(updatedData, salonDetail.id);
            setImageUrl(updateResponse.data.data.imageUrl); 
            Notify.success(response.data.message);
        } catch (error) {
            console.error('Error uploading image:', error);
            Notify.error('Image upload failed. Please try again.'); 
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <InputFile
            name={name}
            onFileSelect={handleOnFileSelect}
            buttonName={isLoading ? 'Uploading...' : 'Update'} 
            disabled={isLoading}
        />
    );
}

export default ImageUpdate;
