import React from "react";

function salonImagePopup({ open, onClose, children }) {
    if (!open) return null;

    return (
        <div className="custom-modal" style={{
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
}

export default salonImagePopup;
