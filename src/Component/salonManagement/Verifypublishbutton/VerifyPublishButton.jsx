import React, { useState } from 'react';
import styles from "./Verifypublishbutton.module.css";
import { verifySalon, publishSalon } from '../../../api/account.api';
import Notify from "../../../utils/notify";

function VerifyPublishButton({ salonDetail }) {
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        try {
            if (salonDetail.verified == false) {
                setLoading(true);
                const response = await verifySalon(salonDetail.id);
                console.log("Salon Verified:", response.data);
                Notify.success(response.data.message);
                salonDetail.verified = true;
            }
        } catch (error) {
            console.error("Error verifying salon:", error);
            Notify.error(error.message);
        }  
        finally {
            setLoading(false);
        }
    };

    const handlePublish = async () => {
        try {
            if (salonDetail.verified == true) {
                setLoading(true);
                const response = await publishSalon(salonDetail.id);
                console.log("Salon Published:", response.data);
                Notify.success(response.data.message);
                salonDetail.published = true;
            }
        } catch (error) {
            console.error("Error while publishing salon:", error);
            Notify.error(error.message);
        } 
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center gap-2">
            <button
                type="button"
                className={`${styles.btn}`}
                onClick={handleVerify}
                disabled={salonDetail.verified == true}
            >
                {salonDetail.verified ? "Verified" : "Verify"}
            </button>

            <button
                type="button"
                className={`${styles.btn}`}
                onClick={handlePublish}
                disabled={salonDetail.published == true}
            >
                {salonDetail.published ? "Published" : "Publish"}
            </button>
        </div>
    );
}

export default VerifyPublishButton;
