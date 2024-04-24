import React, { useState, useRef } from "react";
import "./css/SlideSelect.css";
import { Button, Pagination } from "@mui/material";

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
    <>
        <div className="slide-select-container">
            <Pagination count={elements.length} onChange={(_, number) => select(number - 1)}/>   
            <Button variant="contained" onClick={add}>Add</Button>
        </div>
    </>
    )
}

export default SelectContainer;
