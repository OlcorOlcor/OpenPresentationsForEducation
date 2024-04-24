import React, { useState, useRef } from "react";
import "./css/SlideSelect.css";
import { Button, Pagination } from "@mui/material";

interface SelectContainerProps {
    elements: any[];
    onSelect: (index: number) => void;
    onAdd: () => void;
}

const SelectContainer: React.FC<SelectContainerProps> = ({elements, onSelect, onAdd}) => {
    function select(index: number) {
        onSelect(index);
    }

    function add() {
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
