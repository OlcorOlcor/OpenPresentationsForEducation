import React, { useEffect, useRef, useState } from "react";
import "./css/SlideSelect.css";
import { Button, Popover, Tooltip, Grid, ButtonGroup } from "@mui/material";
import { SlideElement } from "../Model/PresentationModel";
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { Constraints } from "../Model/PresentationTypes";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent} from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy} from "@dnd-kit/sortable";
import SortableSlideItem from "./SlideItem";

interface SelectContainerProps {
    elements: (SlideElement | null)[];
    selectedSlideIndex: number;
    onSelect: (index: number) => void;
    onAdd: () => void;
    onAddAfter: () => void;
    onDelete: () => void;
    onActivate: () => void;
    reorderSlides: (oldIndex: number, newIndex: number) => void;
    constraints: Constraints;
    slideAnalysis: Constraints;
}

const SelectContainer: React.FC<SelectContainerProps> = ({
    elements,
    selectedSlideIndex,
    onSelect,
    onAdd,
    onDelete,
    onAddAfter,
    onActivate,
    reorderSlides,
    constraints,
    slideAnalysis
}) => {
    const [infoOpen, setInfoOpen] = useState<boolean>(false);
    const [warningMessageOpen, setWarningMessageOpen] = useState<boolean>(false);
    const iconRef = useRef<HTMLButtonElement>(null);
    const sensors = useSensors(useSensor(PointerSensor));
    
    useEffect(() => {
        if (!isSlideCorrect()) {
            setWarningMessageOpen(true);
        }
    }, [slideAnalysis]);

    useEffect(() => {
        if (warningMessageOpen) {
            const timer = setTimeout(() => {
                setWarningMessageOpen(false);
            }, 3000);
        return () => clearTimeout(timer);
        }
    }, [warningMessageOpen])

    function select(index: number) {
        onSelect(index);
    }

    function handleInfoClick() {
        setInfoOpen(!infoOpen);
    }

    function handleInfoClose() {
        setInfoOpen(false);
    }

    function isSlideCorrect(): boolean {
        if (slideAnalysis.words != null && constraints.words != null && slideAnalysis.words > constraints.words) {
            return false;
        }
        if (slideAnalysis.characters != null && constraints.characters != null && slideAnalysis.characters > constraints.characters) {
            return false;
        }
        if (slideAnalysis.images != null && constraints.images != null && slideAnalysis.images > constraints.images) {
            return false;
        }
        if (slideAnalysis.links != null && constraints.links != null && slideAnalysis.links > constraints.links) {
            return false;
        }
        if (slideAnalysis.headings != null && constraints.headings != null && slideAnalysis.headings > constraints.headings) {
            return false;
        }
        if (slideAnalysis.bullet_points != null && constraints.bullet_points != null && slideAnalysis.bullet_points > constraints.bullet_points) {
            return false;
        }
        return true;
    }


    function handleDragEnd(event: DragEndEvent) {
        if (!event.over) return;

        const oldIndex = Number(event.active.id.toString().replace("slide-", ""));
        const newIndex = Number(event.over.id.toString().replace("slide-", ""));

        if (oldIndex !== newIndex) {
            reorderSlides(oldIndex, newIndex);
        } else {
            select(newIndex);
        }
    }

    return (
        <Grid container spacing={1} style={{marginBottom: "3%"}}>
            <Grid item xs>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={elements.map((_, idx) => `slide-${idx}`)} strategy={horizontalListSortingStrategy}>
                        <div style={{ display: "flex", flexDirection: "row", marginBottom: "1rem" }}>
                            {elements.map((el, index) => (
                                <SortableSlideItem
                                    key={`slide-${index}`}
                                    id={`slide-${index}`}
                                    index={index}
                                    isActive={el?.isActive() ?? false}
                                    isSelected={index === selectedSlideIndex}
                                    onClick={() => select(index)}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </Grid>
            <Grid item>
                <ButtonGroup>
                    <Tooltip open={warningMessageOpen} title="Constraint reached!" arrow>
                        <Button onClick={handleInfoClick} ref={iconRef} color={isSlideCorrect() ? "primary" : "warning"}>
                            <InfoIcon color={isSlideCorrect() ? "primary" : "warning"}/>
                        </Button>
                    </Tooltip>
                    <Tooltip title={elements[selectedSlideIndex] == null || !elements[selectedSlideIndex]!.isActive() ? "Activate slide" : "Deactivate slide" } arrow>
                        <Button color="primary" size="small" onClick={onActivate} style={{zIndex: "0"}}>
                            {elements[selectedSlideIndex] == null || !elements[selectedSlideIndex]!.isActive()
                                ? <VisibilityIcon />
                                : <VisibilityOffIcon /> }
                        </Button>
                    </Tooltip>
                    <Tooltip title={"Add slide"} arrow>
                        <Button color="primary" aria-label="add" size="small" onClick={onAdd} style={{zIndex: "0"}}>
                            <AddIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip title={"Delete slide"} arrow>
                        <Button color="error" aria-label="delete" size="small" onClick={onDelete} style={{zIndex: "0"}}>
                            <DeleteIcon />
                        </Button>
                    </Tooltip>
                </ButtonGroup>
                    <Popover open={infoOpen} anchorEl={iconRef.current} onClose={handleInfoClose} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                        <Grid container direction="column">
                            <Grid item>{ slideAnalysis.words != null && constraints.words != null && slideAnalysis.words > constraints.words && <WarningIcon color="warning"/>}Words: {slideAnalysis.words}</Grid>
                            <Grid item>{ slideAnalysis.characters != null && constraints.characters != null && slideAnalysis.characters > constraints.characters && <WarningIcon color="warning"/>}Characters: {slideAnalysis.characters}</Grid>
                            <Grid item>{ slideAnalysis.images != null && constraints.images != null && slideAnalysis.images > constraints.images && <WarningIcon color="warning"/>}Images: {slideAnalysis.images}</Grid>
                            <Grid item>{ slideAnalysis.links != null && constraints.links != null && slideAnalysis.links > constraints.links && <WarningIcon color="warning"/>}Links: {slideAnalysis.links}</Grid>
                            <Grid item>{ slideAnalysis.headings != null && constraints.headings != null && slideAnalysis.headings > constraints.headings && <WarningIcon color="warning"/>}Headings: {slideAnalysis.headings}</Grid>
                            <Grid item>{slideAnalysis.bullet_points != null && constraints.bullet_points != null && slideAnalysis.bullet_points > constraints.bullet_points && <WarningIcon color="warning"/>}Bullet points: {slideAnalysis.bullet_points}</Grid>
                            <Grid item>{slideAnalysis.tables != null && constraints.tables != null && slideAnalysis.tables > constraints.tables && <WarningIcon color="warning"/>}Tables: {slideAnalysis.tables}</Grid>
                        </Grid>
                    </Popover>
            </Grid>
        </Grid>
    );
};

export default SelectContainer;
