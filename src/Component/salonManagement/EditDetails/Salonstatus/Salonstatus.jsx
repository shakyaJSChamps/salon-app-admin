import React, { useEffect, useState } from 'react';
import styles from './Salonstatus.module.css';
import Notify from "../../../../utils/notify"
import { salonStatus } from '../../../../api/account.api';

function Salonstatus({ salonDetail,fetchSalonDetailData }) {

    const updateSalonStatus = async () => {
        const data = {
            active: !salonDetail.active,
        }
        try {
            const response = await salonStatus(data, salonDetail.id);
            if (response.status === 200) {
                fetchSalonDetailData();
                Notify.success(response.data.message);
            } else {
                console.error('Failed to update status', response);
            }
        } catch (error) {
            Notify.error(error.message);
        }
    };

    return (
        <div>
            <button
                onClick={updateSalonStatus}
                className={`${styles.button} ${salonDetail.active ? styles.active : styles.inactive}`}
            >
                {salonDetail.active ? 'Block' : 'Unblock'}
            </button>
        </div>
    );
}

export default Salonstatus;