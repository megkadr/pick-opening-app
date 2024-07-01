import React from 'react';
import Style from "./YearDisplay.module.css";

interface YearDisplayProps {
    year: number;
}

const YearDisplay: React.FC<YearDisplayProps> = ({ year }) => {
    return (
    <div className={Style.year}>
        <p className={Style.yearNumber}>{year}</p>
    </div>
    );
};

export default YearDisplay;