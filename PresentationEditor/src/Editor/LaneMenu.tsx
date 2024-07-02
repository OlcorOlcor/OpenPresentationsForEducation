import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { Lane, SlideElement } from "../Model/PresentationModel";
import React, { useState } from "react";
import EditLaneContainer from "./EditLaneContainer";
import LaneDialog from "./LaneDialog";

interface LaneMenuProps {
    lanes: Lane[];
    setLanes: React.Dispatch<React.SetStateAction<Lane[]>>;
    selectedLaneIndex: number;
    setSelectedLaneIndex: React.Dispatch<React.SetStateAction<number>>;
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
    setSelectedLaneIndex,
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

    function selectLane(index: number) {
        setSelectedLaneIndex(index);
    }
    return (
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
            <Grid item xs>
                <FormControl fullWidth>
                    <InputLabel id="laneSelectLabel">Select Lane</InputLabel>
                    <Select
                        labelId="laneSelectLabel"
                        value={selectedLaneIndex}
                        onChange={(e) => selectLane(e.target.value as number)}
                    >
                        {lanes.map((lane, i) => (
                            <MenuItem
                                key={i}
                                value={i}
                                disabled={otherLaneIndex === i}
                            >
                                {lane.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item>
                <Button color="primary" variant="contained" onClick={showSettings}>Edit Lane</Button>
            </Grid>
            <Grid item>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Preview"
                        onChange={() => {
                            setEditorView(!editorView);
                        }}
                    />
                </FormGroup>
            </Grid>
            <LaneDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} lanes={lanes} setLanes={setLanes} addLane={addLane} deleteLane={deleteLane}  />
        </Grid>
    );
};

export default LaneMenu;
