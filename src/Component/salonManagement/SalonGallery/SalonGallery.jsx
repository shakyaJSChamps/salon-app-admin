import React from 'react'
import styles from './Salongallery.module.css';
import InputFile from '../../../../Controls/InputFile';
import { fileUploaders } from '../../../api/account.api';
import { useState, useEffect } from 'react';

function SalonGallery({ salonDetail, bannerImages=[], gallaryImages, bankDetails }) {
    let images = bankDetails.documentImageUrl;

    const [bannerUrls, setBannerUrls] = useState([]);
    const [gallaryUrl, setGallaryUrl] = useState([]);

    const handleOnFileSelect = async (files) => {
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
                return URL.createObjectURL(file);
            });
            const uploadedUrls = await Promise.all(uploadPromises);
            setBannerUrls([...bannerUrls, ...uploadedUrls]);
            console.log(bannerUrls);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const gallaryFileSelect = async (file) => {
        try {
            const response = await fileUploaders({ fileName: file.name });
            const formData = new FormData();
            formData.append('file', file)

            const requestOptions = {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                }
            };
            console.log(response);
            await fetch(response.data.data.url, requestOptions);
            setGallaryUrl(URL.createObjectURL(file));
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <>
            <div>
                <div className=' d-flex justify-content-between align-items-center'>
                    <h4>Salon Gallary</h4>

                    <div className='d-flex justify-content-start align-items-center mb-3'>
                        <button type='submit' className={styles.btn}>Add</button>
                        <button type='submit' className={styles.btn}>Remove</button>
                    </div>
                </div>

                <h5 className='mt-3'>Maingate Image</h5>
                <div>
                    <img className={styles.img} src={salonDetail.mainGateImageUrl}></img>
                </div>
                <hr />
            </div>


            {/* Banner Images */}
            <div className='bannerImages'>
                <div className=' d-flex justify-content-between align-items-center'>
                    <h5>Banner Images</h5>

                    <div className='d-flex justify-content-start align-items-center mb-3'>
                        <InputFile name="BannerImagesUrl" onFileSelect={(e) => handleOnFileSelect(e, "BannerImagesUrl")} />
                        {/* <button type='submit' className={styles.btn}>Remove</button> */}
                    </div>
                </div>

                <div className='d-flex flex-row flex-wrap gap-2'>
                    {bannerImages.map((image, index) => (
                        <img key={index} className={styles.img} src={image} alt={`Banner ${index}`} />
                    ))}

                    {/* {bannerUrls && <img src={bannerUrls} className={styles.img} alt="Preview" />} */}
                    {bannerUrls.map((url, index) => (
                        <img key={index} className={styles.img} src={url} alt={`Banner ${index}`} />
                    ))}
                </div>
                <hr />
            </div>

            {/* Gallary Images */}
            <div>
                <div className=' d-flex justify-content-between align-items-center'>
                    <h5>Gallary Images</h5>

                    <div className='d-flex justify-content-start align-items-center mb-3'>
                        <InputFile name="GallaryImagesUrl" onFileSelect={(e) => gallaryFileSelect(e, "GallaryImagesUrl")} />
                        {/* <button type='submit' className={styles.btn}>Remove</button> */}
                    </div>
                </div>

                <div className='d-flex flex-row flex-wrap mb-3 gap-2 '>
                    {gallaryImages.map((image, index) => (
                        <img key={index} className={styles.img} src={image} alt={`Banner ${index}`} />
                    ))}

                    {/* {gallaryUrl && <img src={gallaryUrl} className={styles.img} />} */}
                </div>
                <hr />
            </div>

            {/* Personal Attachments */}
            <div>
                <div className=' d-flex justify-content-between align-items-center'>
                    <h5> Personal Attachments</h5>

                    <div className='d-flex justify-content-start align-items-center mb-3'>
                        <button type='submit' className={styles.btn}>Add</button>
                        <button type='submit' className={styles.btn}>Remove</button>
                    </div>
                </div>

                <div className='d-flex flex-row flex-wrap mb-3'>
                    <img
                        className={styles.img}
                        src={images}
                        alt="Loading"
                    />
                </div>
            </div>
        </>
    )
}

export default SalonGallery



