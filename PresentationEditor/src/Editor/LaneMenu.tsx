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

    return (
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
            <Grid item xs style={{width: "100%"}}>
                <Button color="primary" variant="contained" onClick={showSettings} style={{width: "100%"}}>{(lanes && lanes[selectedLaneIndex]) ? lanes[selectedLaneIndex].getName() : "choose a lane"}</Button>
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
            <LaneDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} lanes={lanes} setLanes={setLanes} addLane={addLane} deleteLane={deleteLane} selectLane={selectLane}/>
        </Grid>
    );
};

export default LaneMenu;
