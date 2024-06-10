import Notify from "../../../../utils/notify";
import { useState, useEffect } from 'react';
import styles from "./Qrcode.module.css";
import { getQrCode } from "../../../../api/account.api";

const Qrcode = ({ salonDetail }) => {
  const [qr, setQr] = useState("");

  useEffect(() => {
    const getQr = async () => {
      try {
        const response = await getQrCode(salonDetail.id);
        console.log("API response:", response);  // Debugging log

        if (response && response.data && response.data.data) {
          const myQR = response.data.data;
          const qrCode = `data:image/png;base64,${myQR}`;
          console.log("Formatted QR code:", qrCode);  // Debugging log

          setQr(qrCode);
        } else {
          throw new Error("Invalid QR code data");
        }
      } catch (error) {
        console.error("Failed to fetch QR code:", error);  // Added console error
        Notify.error(error.message || "Failed to fetch QR code");
      }
    };

    if (salonDetail && salonDetail.id) {
      getQr();
    }
  }, [salonDetail]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const blob = await fetch(qr).then(res => res.blob());
        await navigator.share({
          title: 'Salon QR Code',
          text: 'Check out this QR code for our salon.',
          files: [
            new File([blob], 'salon_qr_code.png', { type: 'image/png' })
          ]
        });
      } catch (error) {
        Notify.error('Error sharing: ' + error.message);
      }
    } else {
      Notify.error('Web Share API is not supported in your browser.');
    }
  };

  return (

    <>
      <div className="d-flex justify-content-between align-items-center">
        <h4>
          QR code
        </h4>

        <div className={styles.buttonContainer}>
          <a
            href={qr}
            download="salon_qr_code.png"
            className={styles.downloadBtn}
          >
            <button className={styles.button}>Download</button>
          </a>
          <button className={styles.button} onClick={handleShare}>Share</button>
        </div>

      </div>

      <div className="d-flex flex-column justify-content-center align-items-center">
        {qr ? (
          <>
            <img src={qr} alt="QR Code" className={styles.myQr} />
          </>
        ) : (
          <p>Loading QR code...</p>
        )}
      </div>
    </>

  );
};

export default Qrcode;