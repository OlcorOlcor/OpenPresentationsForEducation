import React from "react";
import "./css/SlideSelect.css";
import { Button, Pagination } from "@mui/material";

interface SelectContainerProps {
    elements: any[];
    onSelect: (index: number) => void;
    onAdd: () => void;
    onAddAfter: () => void;
    onDelete: () => void;
}

const SelectContainer: React.FC<SelectContainerProps> = ({elements, onSelect, onAdd, onDelete, onAddAfter}) => {
    function select(index: number) {
        onSelect(index);
    }
    return (
    <div className="slide-select-container">
        <Pagination count={elements.length} onChange={(_, number) => select(number - 1)}/>   
        <Button variant="contained" onClick={onAdd}>Add</Button>
        <Button variant="contained" onClick={onAddAfter}>Add after</Button>
        <Button variant="contained" color="error" onClick={onDelete}>Delete</Button>
    </div>
    )
}

export default SelectContainer;
