import React from "react";
import "@/styles/dropdown.scss";

const Dropdown = ({ children, trigger }: any) => {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (!event.target.closest(".dropdown-content") && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);
    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={() => setIsOpen(true)}>
                {trigger}
            </div>
            {isOpen && <div className="dropdown-content">{children}</div>}
        </div>
    );
};

export default Dropdown;
