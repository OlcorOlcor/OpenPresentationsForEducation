import { Checkbox, Fab, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { Lane, SlideElement } from "../Model/PresentationModel";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditLaneDialog from "./EditLaneDialog";

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
}

const LaneMenu: React.FC<LaneMenuProps> = ({lanes, setLanes, selectedLaneIndex, setSelectedLaneIndex, otherLaneIndex, setSlideMode, setEditorData, editorView, setEditorView}) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    function showSettings() {
        setDialogOpen(true);
    }

    function selectLane(index: number) {
        setSelectedLaneIndex(index);
    }
return (
    <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={4}>
            <FormControl fullWidth>
                <InputLabel id="laneSelectLabel">Select Lane</InputLabel>
                <Select labelId="laneSelectLabel" value={selectedLaneIndex} onChange={(e) => selectLane(e.target.value as number)}>
                    {lanes.map((lane, i) =>(
                        <MenuItem key={i} value={i} disabled={otherLaneIndex === i}>{lane.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={4}>
            <Fab color="secondary" onClick={showSettings}><EditIcon /></Fab>
        </Grid>
        <Grid item xs={4}>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Preview" onChange={() => { setEditorView(!editorView); }}/>
            </FormGroup>
        </Grid>
        <EditLaneDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} lanes={lanes} setLanes={setLanes} selectedLaneIndex={selectedLaneIndex} setSelectedLaneIndex={setSelectedLaneIndex} otherLaneIndex={otherLaneIndex} setSlideMode={setSlideMode} setEditorData={setEditorData} editorView={editorView} setEditorView={setEditorView} />
    </Grid>
)
}

export default LaneMenu;