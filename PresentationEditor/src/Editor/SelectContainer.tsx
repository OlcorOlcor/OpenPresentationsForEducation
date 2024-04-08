import React, { useState, useRef } from "react";
import "./css/SlideSelect.css";

interface SelectContainerProps {
    elements: any[];
    onSelect: (index: number) => void;
    onAdd: () => void;
}

const SelectContainer: React.FC<SelectContainerProps> = ({elements, onSelect, onAdd}) => {
    const [selectedElement, setSelectedElement] = useState<number>(0);
    function select(index: number) {
        setSelectedElement(index);
        onSelect(index);
    }

    function add() {
        setSelectedElement(elements.length);
        onAdd();
    }
    return ( 
        <div className="slide-select-container">
            {elements.map((element, index) => (
            <div key={index} className={`slide-item ${selectedElement === index ? "selected" : ""}`} onClick={() => select(index)}>
                {index}
            </div>
            ))}
            <div className="new-item" onClick={() => add()}>Add</div>
        </div>
    )
}

export default SelectContainer;