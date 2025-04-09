import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from "@mui/material";
import { Lane } from "../Model/PresentationModel";
import React, { useEffect, useState } from "react";

interface LaneEditDialogProps {
    lane: Lane;
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    editLane(name: string, outputType: boolean): void;
    deleteLane(): void;
}

const LaneFormDialog: React.FC<LaneEditDialogProps> = ({ lane, dialogOpen, setDialogOpen, editLane, deleteLane }) => {
    const [name, setName] = useState<string>(lane.getName());
    const [outputType, setOutputType] = useState<boolean>(lane.outputsAsPresentation());

    useEffect(() => {
        setName(lane.getName());
        setOutputType(lane.outputsAsPresentation());
    }, [lane]);

    function handleClose() {
        setDialogOpen(false);
        setName(lane.getName());
        setOutputType(lane.outputsAsPresentation());
    }

    function handleSubmit() {
        editLane(name, outputType);
        setDialogOpen(false);
    }

    return (
        <Dialog
            open={dialogOpen}
            onClose={handleClose}
        >
            <DialogTitle>Lane</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Here you can edit your selected lane.
                </DialogContentText>
                <TextField autoFocus required margin="dense" id="name" name="name" label="Name" type="text" fullWidth variant="standard" value={name} onChange={(e) => setName(e.target.value)}/>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={outputType}
                        />
                    }
                    label="Output as presentation"
                    onChange={() => {setOutputType(!outputType)}}
                />
                <hr />
                <Button onClick={deleteLane} color="error">Delete lane</Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default LaneFormDialog;