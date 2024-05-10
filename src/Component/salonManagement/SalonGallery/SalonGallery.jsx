import React, { useState } from 'react';
import InputFile from '../../../../Controls/InputFile';
import { fileUploaders, updateImage, deleteImage } from '../../../api/account.api';
import Notify from "../../../utils/notify";
import styles from "../SalonGallery/Salongallery.module.css";


function SalonGallery({ salonDetail }) {
    const [mainGateImageUrl, setMainGateImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Track upload progress

    const handleOnFileSelect = async (file) => {
        setIsLoading(true); // Indicate upload in progress
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
                imageType: 'MainGate',
                thumbnailUrl: '', // Assuming thumbnail handling is separate
            };

            const updateResponse = await updateImage(updatedData, salonDetail.id);
            setMainGateImageUrl(updateResponse.data.data.imageUrl); // Update state with saved URL
            Notify.success(response.data.message);
        } catch (error) {
            console.error('Error uploading image:', error);
            Notify.error('Image upload failed. Please try again.'); // Inform user
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    const removeImage = async () => {
        try {
            const data = {

                imageUrl: mainGateImageUrl == null ? salonDetail.mainGateImageUrl : mainGateImageUrl,
                imageType: "MainGate",
                thumbnailUrl: "",
            }
            await deleteImage(data, salonDetail.id);
            Notify.success("Record Deleted!");
        } catch (error) {
            Notify.error(error.message);
        }
    };


    return (
        <>
            <div className='d-flex justify-content-between'>
                <h4>Salon Gallary</h4>
                <div className='d-flex flex-row gap-1'>
                    <InputFile
                        name="mainGateImageUrl"
                        onFileSelect={handleOnFileSelect}
                        buttonName={isLoading ? 'Uploading...' : 'Update'} // Display loading state
                        disabled={isLoading} // Disable input while uploading
                    />
                    <button type="button" className={styles.btn} onClick={removeImage}>
                        Remove
                    </button>
                </div>

            </div>
            {salonDetail && ( // Render only if salonDetail is available
                <div>
                    <h6>Main Gate Image</h6>
                    <img src={mainGateImageUrl == null ? salonDetail.mainGateImageUrl : mainGateImageUrl} style={{ height: '150px', width: '150px' }} alt="Main Gate" />
                </div>
            )}
        </>
    );
}

export default SalonGallery;

