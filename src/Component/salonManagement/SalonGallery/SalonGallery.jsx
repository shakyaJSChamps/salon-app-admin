import React, { useState, useEffect } from 'react';
import { deleteImage, updateImage } from '../../../api/account.api';
import Notify from "../../../utils/notify";
import styles from "../SalonGallery/Salongallery.module.css";
import Swal from "sweetalert2";
import ImageUpdate from '../../common-component/Imageupdate/ImageUpdate';
import MultipleImageUploader from '../../common-component/Multipleimageuploader/MultipleImageUploader';

function SalonGallery({ salonDetail, bannerImages, gallaryImages }) {
    const [mainGateImageUrl, setMainGateImageUrl] = useState(null);
    const [bannerImage, setBannerImage] = useState([]);
    const [gallaryImage, setGallaryImage] = useState([]);
    const [imagePath, setImagePath] = useState('');

    useEffect(() => {
        // Fetch existing images from API
        if (gallaryImages && bannerImages) {
            setBannerImage(bannerImages || []);
            setGallaryImage(gallaryImages || []);
        }
    }, [gallaryImages, bannerImages]);


    const removeImage = async (id, section) => {
        try {
            // Show confirmation dialog
            const result = await Swal.fire({
                title: "Warning",
                text: "Are you sure you want to delete the image ?",
                icon: "warning",
                width: "30%",
                showCancelButton: true,
                confirmButtonColor: " black",
                cancelButtonColor: "#d33",
                confirmButtonText: "Delete",
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

    const handleImageUpload = (path) => {
        setMainGateImageUrl(path);
        setImagePath(path); // Update the state with the new image path
    };

    const update = async () => {
        try {
            const updatedData = {
                imageUrl: imagePath, // Use uploaded image URL
                imageType: "MainGate", // Assuming this is the correct type
                thumbnailUrl: '',
            };

            const updateResponse = await updateImage(updatedData, salonDetail.id);
            setMainGateImageUrl(updateResponse.data.data.imageUrl);

            Notify.success("Image updated successfully");
        } catch (error) {
            Notify.error(error.message);
        }
    };

    return (
        <>
            <div className='d-flex justify-content-between'>
                <h4>Salon Gallery</h4>
                <div className='d-flex flex-row gap-1'>
                    <div className='d-flex flex-row gap-1'>
                        <ImageUpdate
                            onImageUpload={handleImageUpload} // Pass the callback to ImageUpdate
                            name="mainGateImageUrl"
                            buttonName="Update"
                        />
                    </div>
                    <button onClick={update} className={styles.btn}>Save</button>
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
                    <MultipleImageUploader
                        salonDetail={salonDetail}
                        setImages={setBannerImage}
                        imageType="Banner"
                        buttonName="Add"
                        name="bannerImages"
                    />
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
            </div>

            {/* Gallery Images */}
            <div className='mb-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h6>Gallery Images</h6>
                    <MultipleImageUploader
                        salonDetail={salonDetail}
                        setImages={setGallaryImage}
                        imageType="Gallery"
                        buttonName="Add"
                        name="galleryImages"
                    />
                </div>
                {gallaryImage.length > 0 && (
                    <div className='d-flex flex-row flex-wrap gap-2'>
                        {gallaryImage.map((image, index) => (
                            <div key={index} className={styles.imageContainer}>
                                <img src={image.url} style={{ height: '150px', width: '150px' }} alt={`Gallery Image ${index}`} />
                                <button type="button" className={styles.deleteButton} onClick={() => removeImage(image.id, 'gallery')}>Remove</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </>
    );
}

export default SalonGallery;




