import React from "react";
import "./css/SlideSelect.css";
import { Button, Pagination, PaginationItem } from "@mui/material";
import { SlideElement } from "../Model/PresentationModel";

interface SelectContainerProps {
    elements: SlideElement[];
    selectedSlideIndex: number;
    onSelect: (index: number) => void;
    onAdd: () => void;
    onAddAfter: () => void;
    onDelete: () => void;
    onActivate: () => void;
}

const SelectContainer: React.FC<SelectContainerProps> = ({
    elements,
    selectedSlideIndex,
    onSelect,
    onAdd,
    onDelete,
    onAddAfter,
    onActivate,
}) => {
    function select(index: number) {
        onSelect(index);
    }

    return (
        <div className="slide-select-container">
            <Pagination
                count={elements.length}
                shape="rounded"
                variant="outlined"
                page={selectedSlideIndex + 1}
                onChange={(_, number) => select(number - 1)}
                renderItem={(item) => {
                    if (
                        item.type === "start-ellipsis" ||
                        item.type === "end-ellipsis" ||
                        item.type === "previous" ||
                        item.type === "next"
                    ) {
                        return <PaginationItem {...item} />;
                    }
                    return (
                        <PaginationItem
                            {...item}
                            className={
                                elements[(item.page as number) - 1]?.active
                                    ? "active"
                                    : "inactive"
                            }
                        />
                    );
                }}
            />
            <Button variant="contained" onClick={onActivate}>
                {!elements[selectedSlideIndex].active
                    ? "Activate"
                    : "Deactivate"}
            </Button>
            <Button variant="contained" onClick={onAdd}>
                Add
            </Button>
            <Button variant="contained" onClick={onAddAfter}>
                Add after
            </Button>
            <Button variant="contained" color="error" onClick={onDelete}>
                Delete
            </Button>
        </div>
    );
};

export default SelectContainer;
