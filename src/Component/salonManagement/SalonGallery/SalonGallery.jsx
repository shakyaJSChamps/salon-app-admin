// import React, { useState, useEffect } from 'react';
// import InputFile from '../../../../Controls/InputFile';
// import { fileUploaders, updateImage, deleteImage } from '../../../api/account.api';
// import Notify from "../../../utils/notify";
// import styles from "../SalonGallery/Salongallery.module.css";

// function SalonGallery({ salonDetail, bannerImages, gallaryImages }) {
//     const [mainGateImageUrl, setMainGateImageUrl] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [bannerImage, setBannerImage] = useState([]);
//     const [gallaryImage, setGallaryImage] = useState([]);

//     useEffect(() => {
//         // Fetch existing images from API
//         if (gallaryImages && bannerImages) {
//             setBannerImage(bannerImages || []);
//             setGallaryImage(gallaryImages || []);
//         }
//     }, [gallaryImages, bannerImages]);

//     const handleOnFileSelect = async (file) => {
//         // Indicate upload in progress
//         setIsLoading(true);
//         try {
//             const response = await fileUploaders({ fileName: file.name });
//             const requestOptions = {
//                 method: 'PUT',
//                 body: file,
//                 headers: {
//                     'Content-Type': file.type,
//                 },
//             };

//             await fetch(response.data.data.url, requestOptions);
//             const updatedData = {
//                 imageUrl: response.data.data.path, // Use uploaded image URL
//                 imageType: 'MainGate',
//                 thumbnailUrl: '',
//             };

//             const updateResponse = await updateImage(updatedData, salonDetail.id);
//             setMainGateImageUrl(updateResponse.data.data.imageUrl); // Update state with saved URL
//             Notify.success(response.data.message);
//         } catch (error) {
//             console.error('Error uploading image:', error);
//             Notify.error('Image upload failed. Please try again.'); // Inform user
//         } finally {
//             setIsLoading(false); // Reset loading state
//         }
//     };

//     const removeImage = async () => {
//         try {
//             const data = {
//                 imageUrl: mainGateImageUrl == null ? salonDetail.mainGateImageUrl : mainGateImageUrl,
//                 imageType: "MainGate",
//                 thumbnailUrl: "",
//             }
//             await deleteImage(data, salonDetail.id);
//             Notify.success("Record Deleted!");
//         } catch (error) {
//             Notify.error(error.message);
//         }
//     }

//     const gallaryFileSelect = async (files, section) => {
//         try {
//             files = Array.isArray(files) ? files : [files];
//             const uploadPromises = files.map(async (file) => {
//                 const response = await fileUploaders({ fileName: file.name });
//                 const requestOptions = {
//                     method: 'PUT',
//                     body: file,
//                     headers: {
//                         'Content-Type': file.type,
//                     }
//                 };
//                 await fetch(response.data.data.url, requestOptions);
//                 const updatedData = {
//                     imageUrl: response.data.data.path, // Use uploaded image URL
//                     imageType: section === 'banner' ? 'Banner' : 'Gallery',
//                     thumbnailUrl: '',
//                 };
//                 await updateImage(updatedData, salonDetail.id);
//                 return response.data.data.path; // Return the URL
//             });
//             const uploadedUrls = await Promise.all(uploadPromises);
//             if (section === 'banner') {
//                 setBannerImage([...bannerImage, ...uploadedUrls]);
//             } else if (section === 'gallery') {
//                 setGallaryImage([...gallaryImage, ...uploadedUrls]);
//             }
//             Notify.success('Images uploaded successfully.');
//         } catch (error) {
//             console.error('Error uploading images:', error);
//             Notify.error('Image upload failed. Please try again.'); // Inform user
//         }
//     };

//     return (
//         <>
//             <div className='d-flex justify-content-between'>
//                 <h4>Salon Gallery</h4>
//                 <div className='d-flex flex-row gap-1'>
//                     <InputFile
//                         name="mainGateImageUrl"
//                         onFileSelect={handleOnFileSelect}
//                         buttonName={isLoading ? 'Uploading...' : 'Update'} // Display loading state
//                         disabled={isLoading} // Disable input while uploading
//                     />
//                     <button type="button" className={styles.btn} onClick={removeImage}>
//                         Remove
//                     </button>
//                 </div>
//             </div>
//             {salonDetail && ( // Render only if salonDetail is available
//                 <div>
//                     <h6>Main Gate Image</h6>
//                     <img src={mainGateImageUrl == null ? salonDetail.mainGateImageUrl : mainGateImageUrl} style={{ height: '150px', width: '150px' }} alt="Main Gate" />
//                 </div>
//             )}

//             <hr />

//             {/* Banner Images */}
//             <div>
//                 <div className='d-flex justify-content-between align-items-center'>
//                     <h6>Banner Images</h6>
//                     <InputFile
//                         name="bannerImages"
//                         onFileSelect={(files) => gallaryFileSelect(files, 'banner')}
//                         buttonName="Add"
//                         multiple // Allow multiple file selection
//                     />
//                 </div>
//             </div>
//             {bannerImages.length > 0 && ( // Render only if bannerImages are available
//                 <div className='d-flex flex-row flex-wrap gap-2'>
//                     {bannerImages.map((image, index) => (
//                         <img key={index} src={image} style={{ height: '150px', width: '150px' }} alt={`Banner Image ${index}`} />
//                     ))}
//                 </div>
//             )}

//             <hr />

//             {/* Gallery Images */}
//             <div>
//                 <div className='d-flex justify-content-between '>
//                     <h6>Gallery Images</h6>
//                     <InputFile
//                         name="galleryImages"
//                         onFileSelect={(files) => gallaryFileSelect(files, 'gallery')}
//                         buttonName="Add"
//                         multiple // Allow multiple file selection
//                     />
//                 </div>
//             </div>
//             {gallaryImage.length > 0 && ( 
//                 <div className='d-flex flex-row flex-wrap gap-2'>
//                     {gallaryImage.map((image, index) => (
//                         <img key={index} src={image} style={{ height: '150px', width: '150px' }} alt={`Gallery Image ${index}`} />
//                     ))}
//                 </div>
//             )}

//             <hr />
//         </>
//     );
// }

// export default SalonGallery;

import React, { useState, useEffect } from 'react';
import InputFile from '../../../../Controls/InputFile';
import { fileUploaders, updateImage, deleteImage } from '../../../api/account.api';
import Notify from "../../../utils/notify";
import styles from "../SalonGallery/Salongallery.module.css";

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

    const isValidImageType = (file) => {
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/bmp',
            'image/webp',
            'image/svg+xml',
            'image/tiff',
            'image/x-icon',
            'image/vnd.microsoft.icon',
            'image/vnd.wap.wbmp',
            'image/jxr',
            'image/jp2',
            'image/avif',
            // Add more image types here
        ];
        return allowedTypes.includes(file.type);
    };

    const handleOnFileSelect = async (file) => {
        // Validate file type
        if (!isValidImageType(file)) {
            Notify.error('Invalid file type. Please upload a valid image (JPEG, PNG, GIF, BMP, WebP, SVG, TIFF, ICO, WBMP, JXR, JP2, AVIF).');
            return;
        }
        // Proceed with uploading if the file type is valid
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
    }

    const gallaryFileSelect = async (files, section) => {
        try {
            files = Array.isArray(files) ? files : [files];
            // Validate file types
            const invalidFiles = files.filter(file => !isValidImageType(file));
            if (invalidFiles.length > 0) {
                const invalidFileNames = invalidFiles.map(file => file.name).join(', ');
                Notify.error(`Invalid file types: ${invalidFileNames}. Please upload valid images (JPEG, PNG, GIF, BMP, WebP, SVG, TIFF, ICO, WBMP, JXR, JP2, AVIF).`);
                return;
            }
            // Proceed with uploading if all files are valid
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
                await updateImage(updatedData, salonDetail.id);
                return response.data.data.path; // Return the URL
            });
            const uploadedUrls = await Promise.all(uploadPromises);
            if (section === 'banner') {
                setBannerImage([...bannerImage, ...uploadedUrls]);
            } else if (section === 'gallery') {
                setGallaryImage([...gallaryImage, ...uploadedUrls]);
            }
            Notify.success('Images uploaded successfully.');
        } catch (error) {
            console.error('Error uploading images:', error);
            Notify.error('Image upload failed. Please try again.'); // Inform user
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

            <hr />

            {/* Banner Images */}
            <div>
                <div className='d-flex justify-content-between align-items-center'>
                    <h6>Banner Images</h6>
                    <InputFile
                        name="bannerImages"
                        onFileSelect={(files) => gallaryFileSelect(files, 'banner')}
                        buttonName="Add"
                        multiple // Allow multiple file selection
                    />
                </div>
            </div>
            {bannerImages.length > 0 && ( // Render only if bannerImages are available
                <div className='d-flex flex-row flex-wrap gap-2'>
                    {bannerImages.map((image, index) => (
                        <img key={index} src={image} style={{ height: '150px', width: '150px' }} alt={`Banner Image ${index}`} />
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
                        multiple // Allow multiple file selection
                    />
                </div>
            </div>
            {gallaryImage.length > 0 && (
                <div className='d-flex flex-row flex-wrap gap-2'>
                    {gallaryImage.map((image, index) => (
                        <img key={index} src={image} style={{ height: '150px', width: '150px' }} alt={`Gallery Image ${index}`} />
                    ))}
                </div>
            )}

            <hr />
        </>
    );
}

export default SalonGallery;

