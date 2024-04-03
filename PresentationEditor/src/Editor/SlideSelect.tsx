import React, { useState, useRef } from "react";
import { SlideElement } from "../Model/presentationModel";
import "./SlideSelect.css";

interface SlideSelectProps {
    slides: SlideElement[];
    onSelect: (selectedSlideIndex: number) => void;
    addSlide: (newSlide: SlideElement) => void;
}

const SlideSelect: React.FC<SlideSelectProps> = ({slides, onSelect, addSlide}) => {
    console.log("Rendering SlideSelect");
    
    const newSlide = () => {
        let newSlide = new SlideElement([]);
        addSlide(newSlide);
    }

    return ( 
        <div className="slide-select-container">
            {slides.map((slide, index) => (
            <div key={index} className="slide-item" onClick={() => onSelect(index)}>
                {index}
            </div>
            ))}
            <div className="new-item" onClick={newSlide}>Add new slide</div>
        </div>
    )
}

export default SlideSelect;