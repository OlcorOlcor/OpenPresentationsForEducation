import React, { useState, useRef } from "react";
import "./css/SlideSelect.css";

interface SelectContainerProps {
    elements: any[];
    onSelect: (index: number) => void;
    onAdd: () => void;
}

const SelectContainer: React.FC<SelectContainerProps> = ({elements, onSelect, onAdd}) => {
    return (
        <div className="slide-select-container">
            {elements.map((element, index) => (
            <div key={index} className="slide-item" onClick={() => onSelect(index)}>
                {index}
            </div>
            ))}
            <div className="new-item" onClick={onAdd}>Add</div>
        </div>
    )
}

export default SelectContainer;