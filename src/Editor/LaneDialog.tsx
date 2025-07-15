import { Avatar, Box, Button, Checkbox, Dialog, DialogTitle, FormControlLabel, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from "@mui/material";
import { Lane } from "../Model/PresentationModel";
import React, { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";

interface LaneEditDialogProps {
    lanes: Lane[];
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setLanes: React.Dispatch<React.SetStateAction<Lane[]>>;
    addLane(): void;
    deleteLane(index: number): void;
    selectLane(index: number): void;
}

const LaneDialog: React.FC<LaneEditDialogProps> = ({lanes, dialogOpen, setDialogOpen, setLanes, addLane, deleteLane, selectLane}) => {
    const [selectedLaneIndex, setSelectedLaneIndex] = useState<number>(0);
    const [name, setName] = useState<string>("");

    useEffect(() => {
        if (lanes[selectedLaneIndex] !== undefined && lanes[selectedLaneIndex] !== null) {
            setName(lanes[selectedLaneIndex].getName());
        }
    }, [selectedLaneIndex, lanes]);

    function handleClose() {
        if (selectedLaneIndex !== -1) {
            selectLane(selectedLaneIndex);
        }
        setDialogOpen(false);
    }

    function editCurrentLane() {
        setLanes(prev => {
            let newLanes = [...prev];
            let newLane = new Lane(newLanes[selectedLaneIndex].getContent(), name);
            newLanes[selectedLaneIndex] = newLane;
            return newLanes;
        });
    }

    function handleListItemClick(index: number) {
        setSelectedLaneIndex(index);
    }

    function deleteCurrentLane() {
        let index = selectedLaneIndex;
        setSelectedLaneIndex((index >= 1) ? index - 1 : 0);
        deleteLane(selectedLaneIndex);
    }

    return (
        <Dialog onClose={handleClose} open={dialogOpen} fullWidth maxWidth="md">
        <DialogTitle>Lanes</DialogTitle>
            <Grid container sx={{ minHeight: 450, padding: 2}}>
                <Grid item xs={4}>
                    <List sx={{ pt: 0 }}>
                        {lanes.map((lane, i) => (
                        <ListItem disablePadding key={i} >
                            <ListItemButton onClick={() => handleListItemClick(i)}>
                            <ListItemText primary={lane.getName()} />
                            </ListItemButton>
                        </ListItem>
                        ))}
                        <ListItem disablePadding>
                        <ListItemButton
                            autoFocus
                            onClick={() => addLane()}
                        >
                            <ListItemAvatar>
                            <Avatar>
                                <Add />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Add lane" />
                        </ListItemButton>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={8}>
                    {lanes[selectedLaneIndex] !== undefined && lanes[selectedLaneIndex] !== null 
                    ? (
                        <Grid container direction={"column"} height={"100%"}>
                            <Grid item xs>
                                <TextField required style={{marginBottom: "5%"}}margin="dense" id="name" name="name" label="Name" type="text" fullWidth variant="standard" value={name} onChange={(e) => setName(e.target.value)}/>
                            </Grid>
                            <Grid item style={{paddingLeft: "max", alignContent: "rigth"}}>
                                <Box display="flex" justifyContent="flex-end" gap={4}>
                                    <Button color="error" onClick={deleteCurrentLane}>
                                        Delete lane
                                    </Button>
                                    <Button color="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onClick={editCurrentLane}>
                                        Save
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    ) 
                    : (<p>Select a lane to edit</p>)}
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default LaneDialog;