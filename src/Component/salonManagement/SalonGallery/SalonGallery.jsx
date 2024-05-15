import React, { useState, useEffect } from 'react';
import InputFile from '../../../../Controls/InputFile';
import { fileUploaders, updateImage, deleteImage } from '../../../api/account.api';
import Notify from "../../../utils/notify";
import styles from "../SalonGallery/Salongallery.module.css";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";

function SalonGallery({ salonDetail, bannerImages, gallaryImages }) {
    const [mainGateImageUrl, setMainGateImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [bannerImage, setBannerImage] = useState([]);
    const [gallaryImage, setGallaryImage] = useState([]);

    useEffect(() => {
        // Fetch existing images from API
        if (gallaryImages && bannerImages) {
            setBannerImage(bannerImages || []);
            setGallaryImage(gallaryImages || []);
        }
    }, [gallaryImages, bannerImages]);

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
                imageType: 'MainGate',
                thumbnailUrl: '',
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

    const gallaryFileSelect = async (files, section) => {
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
                    imageUrl: response.data.data.path, // Use uploaded image URL
                    imageType: section === 'banner' ? 'Banner' : 'Gallery',
                    thumbnailUrl: '',
                };
                const res = await updateImage(updatedData, salonDetail.id);
                return { id: res.data.data.id, url: response.data.data.path }; // Return object with id and URL
            });
            const uploadedImages = await Promise.all(uploadPromises);
            if (section === 'banner') {
                setBannerImage([...bannerImage, ...uploadedImages]);
            } else if (section === 'gallery') {
                setGallaryImage([...gallaryImage, ...uploadedImages]);
            }
            Notify.success('Images uploaded successfully.');
        } catch (error) {
            console.error('Error uploading images:', error);
            Notify.error('Image upload failed. Please try again.'); 
        }
    };

    const removeImage = async (id, section) => {
        try {
            // Show confirmation dialog
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Are you sure you want to delete the image ?",
                icon: "warning",
                width: "30%",
                showCancelButton: true,
                confirmButtonColor: "black",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
                customClass: "custom-swal",
            });

            if (result.isConfirmed) {
                await deleteImage(id);
                Notify.success("Image Deleted Successfully");

                // Filter out the deleted image from the state based on section
                if (section === 'banner') {
                    setBannerImage(bannerImage.filter(image => image.id !== id));
                } else if (section === 'gallery') {
                    setGallaryImage(gallaryImage.filter(image => image.id !== id));
                }
            }
        } catch (error) {
            Notify.error(error.message);
        }
    };

    return (
        <>
            <div className='d-flex justify-content-between'>
                <h4>Salon Gallery</h4>
                <div className='d-flex flex-row gap-1'>
                    <InputFile
                        name="mainGateImageUrl"
                        onFileSelect={handleOnFileSelect}
                        buttonName={isLoading ? 'Uploading...' : 'Update'} // Display loading state
                        disabled={isLoading} // Disable input while uploading
                    />
                </div>
            </div>
            {salonDetail && ( 
                <div>
                    <h6>Main Gate Image</h6>
                    <img src={mainGateImageUrl == null ? salonDetail.mainGateImageUrl : mainGateImageUrl} style={{ height: '150px', width: '150px' }} alt="Main Gate" />
                </div>
            )}

            <hr />

            {/* Banner Images */}
            <div>
                <div className='d-flex justify-content-between align-items-center'>
                    <h6>Banner Images</h6>
                    <InputFile
                        name="bannerImages"
                        onFileSelect={(files) => gallaryFileSelect(files, 'banner')}
                        buttonName="Add"
                        multiple 
                    />
                </div>
            </div>
            {bannerImage.length > 0 && (
                <div className='d-flex flex-row flex-wrap gap-2'>
                    {bannerImage.map((image, index) => (
                        <div key={index} className={styles.imageContainer}>
                            <img src={image.url} style={{ height: '150px', width: '150px' }} alt={`Banner Image ${index}`} />
                            <button type="button" className={styles.deleteButton} onClick={() => removeImage(image.id, 'banner')}>Remove</button>
                        </div>
                    ))}
                </div>
            )}

            <hr />

            {/* Gallery Images */}
            <div>
                <div className='d-flex justify-content-between '>
                    <h6>Gallery Images</h6>
                    <InputFile
                        name="galleryImages"
                        onFileSelect={(files) => gallaryFileSelect(files, 'gallery')}
                        buttonName="Add"
                        multiple 
                    />
                </div>
            </div>
            {gallaryImage.length > 0 && (
                <div className='d-flex flex-row flex-wrap gap-2 mb-3'>
                    {gallaryImage.map((image, index) => (
                        <div key={index} className={styles.imageContainer}>
                            <img src={image.url} style={{ height: '150px', width: '150px' }} alt={`Gallery Image ${index}`} />
                            <button type="button" className={styles.deleteButton} onClick={() => removeImage(image.id, 'gallery')}>Remove</button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default SalonGallery;




