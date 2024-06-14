import React, { useState, useEffect } from 'react';
import { deleteImage, updateMaingate, updateImage } from '../../../api/account.api';
import Notify from "../../../utils/notify";
import styles from "./Salongallery.module.css";
import Swal from "sweetalert2";
import ImageUpdate from '../../common-component/Imageupdate/ImageUpdate';
import MultipleImageUploader from '../../common-component/Multipleimageuploader/MultipleImageUploader';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

function SalonGallery({ salonDetail, bannerImages, gallaryImages }) {
    const [mainGateImageUrl, setMainGateImageUrl] = useState(null);
    const [bannerImage, setBannerImage] = useState([]);
    const [gallaryImage, setGallaryImage] = useState([]);
    const [imagePath, setImagePath] = useState('');
    const [isImageUpdated, setIsImageUpdated] = useState(false); 

    useEffect(() => {
        if (gallaryImages && bannerImages) {
            setBannerImage(bannerImages || []);
            setGallaryImage(gallaryImages || []);
        }
    }, [gallaryImages, bannerImages]);

    useEffect(() => {
        if (imagePath !== '') {
            setIsImageUpdated(true);
        }
    }, [imagePath]);

    const removeImage = async (id, section) => {
        try {
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
        setImagePath(path);
    };

    const update = async () => {
        if (salonDetail.mainGateImageUrl) {
            try {
                const updatedData = {
                    imageUrl: imagePath,
                    thumbnailUrl: 'https://example.com/thumb103.jpg',
                };
                const updateResponse = await updateMaingate(updatedData, salonDetail.id);
                setMainGateImageUrl(updateResponse.data.data.imageUrl);
                Notify.success("Image updated successfully");
                setIsImageUpdated(false); // Reset the flag after successful update
            } catch (error) {
                Notify.error(error.message);
            }
        } else {
            try {
                const updatedData = {
                    imageUrl: imagePath,
                    imageType: "MainGate",
                    thumbnailUrl: 'https://example.com/thumb103.jpg',
                };
                const updateResponse = await updateImage(updatedData, salonDetail.id);
                setMainGateImageUrl(updateResponse.data.data.imageUrl);
                Notify.success("Image updated successfully");
                setIsImageUpdated(false); 
            } catch (error) {
                Notify.error(error.message);
            }
        }
    }

    const buttonStyle = {
        padding: '3px 20px',
        backgroundColor: '#000',
        color: '#fff',
        border: '2px solid #909090',
        borderRadius: '12px',
        marginTop: '10px',
        fontSize: '11px'
    };

    return (
        <>
            <div className='d-flex justify-content-between'>
                <h4>Salon Gallery</h4>
                <div className='d-flex flex-row gap-1'>
                    {isImageUpdated ? (
                        <button onClick={update} className={styles.btn}>Save</button>
                    ) : (
                        <div className='d-flex flex-row gap-1'>
                            <ImageUpdate
                                onImageUpload={handleImageUpload}
                                name="mainGateImageUrl"
                                buttonName="Update"
                                buttonStyle={buttonStyle}
                            />
                        </div>
                    )}
                </div>
            </div>
            {salonDetail && (
                <div>
                    <h6>Main Gate Image</h6>
                    <Zoom>
                        <img src={mainGateImageUrl == null ? salonDetail.mainGateImageUrl : mainGateImageUrl} style={{ height: '150px', width: '150px' }} alt="Main Gate" />
                    </Zoom>
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
                        buttonStyle={buttonStyle}
                    />
                </div>
                {bannerImage.length > 0 && (
                    <div className='d-flex flex-row flex-wrap gap-2'>
                        {bannerImage.map((image, index) => (
                            <div key={index} className={styles.imageContainer}>
                                <Zoom>
                                    <img src={image.url} style={{ height: '150px', width: '150px' }} alt={`Banner Image ${index}`} />
                                </Zoom>
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
                        buttonStyle={buttonStyle}
                    />
                </div>
                {gallaryImage.length > 0 && (
                    <div className='d-flex flex-row flex-wrap gap-2'>
                        {gallaryImage.map((image, index) => (
                            <div key={index} className={styles.imageContainer}>
                                <Zoom>
                                    <img src={image.url} style={{ height: '150px', width: '150px' }} alt={`Gallery Image ${index}`} />
                                </Zoom>
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
