"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "@/styles/__countdown.scss";

const CountdownItem = ({ num, text }: any) => {
    return (
        <div id="timer-container">
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={num}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ ease: "backIn", duration: 0.25 }}
                    className=""
                >
                    {num}
                </motion.span>
            </AnimatePresence>
            <span className="">{text}</span>
        </div>
    );
};

const EventCountdown = () => {
    const COUNTDOWN_FROM = "12/31/2023";

    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;

    const intervalRef: any = React.useRef(null);

    const [remaining, setRemaining] = React.useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    React.useEffect(() => {
        intervalRef.current = setInterval(handleCountdown, 1000);

        return () => clearInterval(intervalRef.current || undefined);
    }, []);

    const handleCountdown = () => {
        const end = new Date(COUNTDOWN_FROM);

        const now = new Date();

        const distance = +end - +now;

        const days = Math.floor(distance / DAY);
        const hours = Math.floor((distance % DAY) / HOUR);
        const minutes = Math.floor((distance % HOUR) / MINUTE);
        const seconds = Math.floor((distance % MINUTE) / SECOND);

        setRemaining({
            days,
            hours,
            minutes,
            seconds,
        });
    };
    return (
        <ul id="time-box">
            <li className="time-box-container">
                <span className="time-box-container-title">LEVEL</span>
                <span className="time-box-container-value">01</span>
            </li>
            <li className="time-box-container">
                <span className="time-box-container-title">TITLE</span>
                <span className="time-box-container-value">THE BEGINNING</span>
            </li>
            <li className="time-box-container">
                <span className="time-box-container-title">TIME LEFT</span>
                <span className="time-box-container-value">
                    <div className="countdown-container">
                        <CountdownItem num={remaining.days} text=":" />
                        <CountdownItem num={remaining.hours} text=":" />
                        <CountdownItem num={remaining.minutes} text=":" />
                        <CountdownItem num={remaining.seconds} text="" />
                    </div>
                </span>
            </li>
        </ul>
    );
};

export default EventCountdown;
