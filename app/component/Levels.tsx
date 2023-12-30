"use client";

import React from "react";
import "@/styles/__levels.scss";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Card = ({ level, levelTitle }: any) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(
        mouseYSpring,
        [-0.5, 0.5],
        ["17.5deg", "-17.5deg"]
    );
    const rotateY = useTransform(
        mouseXSpring,
        [-0.5, 0.5],
        ["-17.5deg", "17.5deg"]
    );

    const handleMouseMove = (e: any) => {
        const rect = e.target.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="level-outer-layer"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="level-inner-layer"
            >
                <span className="card-title">LEVEL</span>
                <span className="card-title-content">{level}</span>
                <span className="card-content">{levelTitle}</span>
            </div>
        </motion.div>
    );
};

const Levels = () => {
    return (
        <>
            <h1 id="levels-header">LEVELS</h1>
            <div id="card-container">
                <Card level="01" levelTitle="THE BEGINNING" />
                <Card level="02" levelTitle="COMING SOON" />
            </div>
        </>
    );
};

export default Levels;
