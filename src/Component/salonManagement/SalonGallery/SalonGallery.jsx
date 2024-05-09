import React, { useState, useEffect } from 'react';
import styles from './Salongallery.module.css';
import InputFile from '../../../../Controls/InputFile';
import { fileUploaders, updateImage } from '../../../api/account.api';

function SalonGallery({ salonDetail }) {
    const [mainGateImageUrl, setMainGateImageUrl] = useState(salonDetail.mainGateImageUrl);

const handleOnFileSelect = async (file) => {
    try {
        const response = await fileUploaders({ fileName: file.name });
        const requestOptions = {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            }
        };
        await fetch(response.data.data.url, requestOptions);
        const imageUrl = URL.createObjectURL(file);
        const data = {
            imageUrl: imageUrl,
            imageType: 'MainGate',
            thumbnailUrl: '',
        }
        const updateResponse = await updateImage(data, salonDetail.id);
        console.log("Salon ID", updateResponse)
        setMainGateImageUrl(updateResponse.data.imageUrl, salonDetail.id);
        Notify.success(response.data.message);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};

    return (
        <>
            <div className='d-flex justify-content-between'>
                <h4>Salon Gallery</h4>
                <InputFile name="mainGateImageUrl" onFileSelect={handleOnFileSelect} buttonName="Update" />
            </div>
            <div>
                <h6>Main Gate Image</h6>
                <img src={mainGateImageUrl} style={{ height: '150px', width: '150px' }} alt="Main Gate" />
            </div>
            <hr />
        </>
    );
}

export default SalonGallery;

