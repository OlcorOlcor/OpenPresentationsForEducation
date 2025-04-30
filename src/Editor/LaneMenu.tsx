import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import { Lane, SlideElement } from "../Model/PresentationModel";
import React, { useState } from "react";
import LaneDialog from "./LaneDialog";

interface LaneMenuProps {
    lanes: Lane[];
    setLanes: React.Dispatch<React.SetStateAction<Lane[]>>;
    selectedLaneIndex: number;
    selectLane(index: number): void;
    otherLaneIndex: number;
    setSlideMode: React.Dispatch<React.SetStateAction<boolean>>;
    setEditorData: React.Dispatch<React.SetStateAction<string>>;
    editorView: boolean;
    setEditorView: React.Dispatch<React.SetStateAction<boolean>>;
    addLane(): void;
    deleteLane(index: number): void; 
}

const LaneMenu: React.FC<LaneMenuProps> = ({
    lanes,
    setLanes,
    selectedLaneIndex,
    selectLane,
    otherLaneIndex,
    editorView,
    setEditorView,
    addLane,
    deleteLane
}) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    function showSettings() {
        setDialogOpen(true);
    }

    function handleLaneChange(e: any) {
        selectLane(e.target.value as number);
    }

    function handleViewChange(e: any) {
        setEditorView(e.target.value === "editor");
    }

    return (
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={6} md={6}>
                <FormControl fullWidth size="small">
                    <InputLabel id="laneSelectLabel">Active lane:</InputLabel>
                    <Select
                        labelId="laneSelectLabel"
                        id="laneSelect"
                        value={selectedLaneIndex}
                        label="Active lane:"
                        onChange={handleLaneChange}
                    >
                        {lanes.map((lane, index) => (
                            <MenuItem key={index} value={index}>
                                {lane.getName()}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
                <FormControl fullWidth size="small">
                    <InputLabel id="mode-select-label">View:</InputLabel>
                    <Select
                        labelId="mode-select-label"
                        id="mode-select"
                        value={editorView ? "editor" : "preview"}
                        onChange={handleViewChange}
                        label="View:"
                    >
                        <MenuItem value="editor">Editor</MenuItem>
                        <MenuItem value="preview">Preview</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>

    );
};

export default LaneMenu;
