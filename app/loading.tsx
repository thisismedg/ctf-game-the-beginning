import React from "react";
import "@/styles/loading.scss";

const Loading = () => {
    return (
        <div id="loading-container">
            <div className="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Loading;
