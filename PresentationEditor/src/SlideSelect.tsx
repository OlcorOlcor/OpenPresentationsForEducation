import React, { useState, useRef } from "react";
import { SlideElement } from "./presentationModel";
import "./SlideSelect.css";

interface SlideSelectProps {
    slides: SlideElement[];
    onSelect: (selectedSlide: SlideElement) => void;
}

const SlideSelect: React.FC<SlideSelectProps> = ({slides, onSelect}) => {
    const [selectedSlide, setSelectedSlide] = useState<SlideElement | null>(null);

    const handleItemClick = (slide: SlideElement) => {
        setSelectedSlide(slide);
        onSelect(slide);
    };

    return ( 
        <div className="slide-select-container">
            {slides.map((slide, index) => (
            <div className="slide-item" onClick={() => handleItemClick(slide)}>
                {index}
            </div>
            ))}
        </div>
    )
}

export default SlideSelect;