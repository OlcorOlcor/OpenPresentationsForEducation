import {
    Button,
    Checkbox,
    Dialog,
    DialogTitle,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Lane } from "../Model/PresentationModel";

interface EditLaneDialogProps {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    lanes: Lane[];
    setLanes: React.Dispatch<React.SetStateAction<Lane[]>>;
    selectedLaneIndex: number;
    setSelectedLaneIndex: React.Dispatch<React.SetStateAction<number>>;
    otherLaneIndex: number;
    setSlideMode: React.Dispatch<React.SetStateAction<boolean>>;
    setEditorData: React.Dispatch<React.SetStateAction<string>>;
    editorView: boolean;
    setEditorView: React.Dispatch<React.SetStateAction<boolean>>;
    deleteLane(index: number): void; 
}

const EditLaneDialog: React.FC<EditLaneDialogProps> = ({
    dialogOpen,
    setDialogOpen,
    lanes,
    setLanes,
    selectedLaneIndex,
    setSelectedLaneIndex,
    otherLaneIndex,
    setSlideMode,
    setEditorData,
    deleteLane
}) => {
    const [dialogLane, setDialogLane] = useState<Lane>(
        lanes[selectedLaneIndex],
    );

    useEffect(() => {
        setDialogLane(lanes[selectedLaneIndex]);
    }, [selectedLaneIndex]);

    function handleClose() {
        setLanes((prev) => {
            let updated = [...prev];
            updated[selectedLaneIndex] = dialogLane;
            return updated;
        });
        setSlideMode(dialogLane.outputAsPresentation);
        setDialogOpen(false);
    }

    function handleNameChange(name: string) {
        setDialogLane((prev) => ({ ...prev, name: name }));
    }

    function handleOutputTypeChange() {
        setDialogLane((prev) => ({
            ...prev,
            outputAsPresentation: !prev.outputAsPresentation,
        }));
    }
    
    return (
        <Dialog open={dialogOpen} onClose={handleClose} fullWidth>
            <DialogTitle>
                <Typography variant="h6" align="center">
                    Lane settings
                </Typography>
            </DialogTitle>
            
            <Grid container direction="column">
                <Grid item style={{marginLeft: 10, marginRight: 10}}>
                    <TextField
                        id="Lane name"
                        variant="outlined"
                        label="Name"
                        value={dialogLane.name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item style={{marginLeft: 10, marginRight: 10}}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={dialogLane.outputAsPresentation}
                            />
                        }
                        label="Output as presentation"
                        onChange={handleOutputTypeChange}
                    />
                </Grid>
                <Grid container spacing={4}>
                    <Grid item>
                        <Button color="primary" variant="contained" onClick={handleClose}>
                            Confirm
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <Button color="error" variant="contained" onClick={() => {deleteLane(selectedLaneIndex); setDialogOpen(false)}}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default EditLaneDialog;
