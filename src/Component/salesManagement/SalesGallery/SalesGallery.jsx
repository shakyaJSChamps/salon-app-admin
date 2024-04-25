import React from 'react';
import { Grid } from '@mui/material';
import styles from './SalesGallery.module.css';

function SalesGallery({ salonDetail, bannerImages, galleryImages, bankDetails }) {
    let images = bankDetails?.documentImageUrl || '';
    
    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <h4>Sales Gallery</h4>

                <div className='d-flex justify-content-start align-items-center mb-3'>
                    <button type='submit' className={styles.btn}>Add</button>
                    <button type='submit' className={styles.btn}>Remove</button>
                </div>
            </div>

            <h5 className='mt-3'>Main Gate Image</h5>
            <div>
                <img className={styles.img} src={salonDetail?.mainGateImageUrl} alt="Main Gate" />
            </div>
            <hr />

            <div className='d-flex justify-content-between align-items-center'>
                <h5>Banner Images</h5>

                <div className='d-flex justify-content-start align-items-center mb-3'>
                    <button type='submit' className={styles.btn}>Add</button>
                    <button type='submit' className={styles.btn}>Remove</button>
                </div>
            </div>

            <div className='d-flex flex-row flex-wrap'>
                {bannerImages.map((image, index) => (
                    <img key={index} className={styles.img} src={image} alt={`Banner ${index}`} />
                ))}
            </div>
            <hr />

            <div className='d-flex justify-content-between align-items-center'>
                <h5>Gallery Images</h5>

                <div className='d-flex justify-content-start align-items-center mb-3'>
                    <button type='submit' className={styles.btn}>Add</button>
                    <button type='submit' className={styles.btn}>Remove</button>
                </div>
            </div>

            <div className='d-flex flex-row flex-wrap mb-3'>
                {galleryImages.map((image, index) => (
                    <img key={index} className={styles.img} src={image} alt={`Gallery ${index}`} />
                ))}
            </div>
            <hr />

            <div className='d-flex justify-content-between align-items-center'>
                <h5>Personal Attachments</h5>

                <div className='d-flex justify-content-start align-items-center mb-3'>
                    <button type='submit' className={styles.btn}>Add</button>
                    <button type='submit' className={styles.btn}>Remove</button>
                </div>
            </div>

            <div className='d-flex flex-row flex-wrap mb-3'>
                <img className={styles.img} src={images} alt="Personal Attachments" />
            </div>
        </>
    );
}

export default SalesGallery;
