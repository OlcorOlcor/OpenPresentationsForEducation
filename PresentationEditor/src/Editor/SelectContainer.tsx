import React, { useEffect, useRef, useState } from "react";
import "./css/SlideSelect.css";
import { IconButton, Button, Pagination, PaginationItem, Popover, Tooltip, Grid, Fab } from "@mui/material";
import { SlideElement } from "../Model/PresentationModel";
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { Constraints } from "../Model/PresentationTypes";
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
interface SelectContainerProps {
    elements: (SlideElement | null)[];
    selectedSlideIndex: number;
    onSelect: (index: number) => void;
    onAdd: () => void;
    onAddAfter: () => void;
    onDelete: () => void;
    onActivate: () => void;
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
    constraints,
    slideAnalysis
}) => {
    const [infoOpen, setInfoOpen] = useState<boolean>(false);
    const [warningMessageOpen, setWarningMessageOpen] = useState<boolean>(false);
    const iconRef = useRef<HTMLButtonElement>(null);
    
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

    return (
        <Grid container spacing={1}>
            <Grid item>
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
                                className={`
                                    ${elements[(item.page as number) - 1]?.active ? "active" : "inactive"} 
                                    ${((item.page as number) - 1) === selectedSlideIndex ? "selected" : ""}
                                `}
                            />
                        );
                    }}
                />
            </Grid>
            <Grid item>
                <Tooltip title={elements[selectedSlideIndex] == null || !elements[selectedSlideIndex]!.active ? "Activate slide" : "Deactivate slide" } arrow>
                    <Fab color="primary" size="small" onClick={onActivate}>
                        {elements[selectedSlideIndex] == null || !elements[selectedSlideIndex]!.active
                            ? <ToggleOffIcon />
                            : <ToggleOnIcon /> }
                    </Fab>
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip title={"Add slide"} arrow>
                    <Fab color="primary" aria-label="add" size="small" onClick={onAdd}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip title={"Add slide in place"} arrow>
                    <Fab color="primary" aria-label="add after" size="small" onClick={onAddAfter}>
                        <AddCircleOutlineIcon />
                    </Fab>
                </ Tooltip>
            </Grid>
            <Grid item>
                <Tooltip title={"Delete slide"} arrow>
                    <Fab color="error" aria-label="delete" size="small" onClick={onDelete}>
                        <DeleteIcon />
                    </Fab>
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip open={warningMessageOpen} title="Constraint reached!" arrow>
                    <IconButton onClick={handleInfoClick} ref={iconRef}>
                        <InfoIcon color={isSlideCorrect() ? "primary" : "warning"}/>
                    </IconButton>
                </Tooltip>
                <Popover open={infoOpen} anchorEl={iconRef.current} onClose={handleInfoClose} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                    <Grid container direction="column">
                        <Grid item>{ slideAnalysis.words != null && constraints.words != null && slideAnalysis.words > constraints.words && <WarningIcon color="warning"/>}Words: {slideAnalysis.words}</Grid>
                        <Grid item>{ slideAnalysis.characters != null && constraints.characters != null && slideAnalysis.characters > constraints.characters && <WarningIcon color="warning"/>}Characters: {slideAnalysis.characters}</Grid>
                        <Grid item>{ slideAnalysis.images != null && constraints.images != null && slideAnalysis.images > constraints.images && <WarningIcon color="warning"/>}Images: {slideAnalysis.images}</Grid>
                        <Grid item>{ slideAnalysis.links != null && constraints.links != null && slideAnalysis.links > constraints.links && <WarningIcon color="warning"/>}Links: {slideAnalysis.links}</Grid>
                        <Grid item>{ slideAnalysis.headings != null && constraints.headings != null && slideAnalysis.headings > constraints.headings && <WarningIcon color="warning"/>}Headings: {slideAnalysis.headings}</Grid>
                        <Grid item>{slideAnalysis.bullet_points != null && constraints.bullet_points != null && slideAnalysis.bullet_points > constraints.bullet_points && <WarningIcon color="warning"/>}Bullet points: {slideAnalysis.bullet_points}</Grid>
                    </Grid>
                </Popover>
            </Grid>
        </Grid>
    );
};

export default SelectContainer;
