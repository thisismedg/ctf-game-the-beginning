"use client";

import React from "react";
import "@/styles/__modal.scss";

const Modal = ({ children, trigger, closeModal, className }: any) => {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (!event.target.closest(".modal-container") && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <div className="modal-trigger" onClick={() => {
                setIsOpen(true)
                closeModal(true)
            }}>
                {trigger}
            </div>
            {isOpen && (
                <div className="modal">
                    <div className={`modal-container ${className}`}>{children}</div>
                </div>
            )}
        </>
    );
};

export default Modal;
