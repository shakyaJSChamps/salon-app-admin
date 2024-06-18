import React from 'react'
import { fileUploaders, updateImage } from '../../../api/account.api';
import Notify from "../../../utils/notify"
import InputFile from '../Inputfile/InputFile';

function MultipleImageUploader({ salonDetail, setImages, imageType, buttonName, name, buttonStyle ,allowEdit}) {

    const multipleFileSelect = async (files) => {
        try {
            files = Array.isArray(files) ? files : [files];
            const uploadPromises = files.map(async (file) => {
                const response = await fileUploaders({ fileName: file.name });
                const requestOptions = {
                    method: 'PUT',
                    body: file,
                    headers: {
                        'Content-Type': file.type,
                    }
                };
                await fetch(response.data.data.url, requestOptions);
                const updatedData = {
                    imageUrl: response.data.data.path, 
                    imageType: imageType,
                    thumbnailUrl: '',
                };
                const res = await updateImage(updatedData, salonDetail.id);
                return { id: res.data.data.id, url: response.data.data.path }; 
            });
            const uploadedImages = await Promise.all(uploadPromises);
            setImages(prevImages => [...prevImages, ...uploadedImages]);

            Notify.success('Images uploaded successfully.');
        } catch (error) {
            console.error('Error uploading images:', error);
            Notify.error('Image upload failed. Please try again.');
        }
    };
    return (
        <div>
            <InputFile
                name={name}
                onFileSelect={(files) => multipleFileSelect(files)}
                buttonName={buttonName}
                buttonStyle={buttonStyle}
                multiple
                allowEdit={allowEdit}
            />
        </div>

    )
}

export default MultipleImageUploader
