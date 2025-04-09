import { Avatar, Dialog, DialogTitle, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { Lane } from "../Model/PresentationModel";
import React, { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import LaneFormDialog from "./LaneFormDialogue";

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
    const [formDialogOpen, setFormDialogOpen] = useState<boolean>(false);

    function handleClose() {
        if (selectedLaneIndex !== -1) {
            selectLane(selectedLaneIndex);
        }
        setDialogOpen(false);
    }

    function editCurrentLane(name: string, outputType: boolean) {
        setLanes(prev => {
            let newLanes = [...prev];
            let newLane = new Lane(newLanes[selectedLaneIndex].getContent(), name, outputType);
            newLanes[selectedLaneIndex] = newLane;
            return newLanes;
        });
    }

    function handleListItemClick(index: number) {
        setSelectedLaneIndex(index);
        setFormDialogOpen(true);
    }

    function deleteCurrentLane() {
        let index = selectedLaneIndex;
        setSelectedLaneIndex((index >= 1) ? index - 1 : 0);
        deleteLane(selectedLaneIndex);
        setFormDialogOpen(false);
    }

    return (
        <Dialog onClose={handleClose} open={dialogOpen}>
        <DialogTitle>Lanes</DialogTitle>
            <List sx={{ pt: 0 }}>
                {lanes.map((lane, i) => (
                <ListItem disablePadding key={i}>
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
            {lanes[selectedLaneIndex] !== undefined && lanes[selectedLaneIndex] !== null 
            ? (<LaneFormDialog lane={lanes[selectedLaneIndex]} dialogOpen={formDialogOpen} setDialogOpen={setFormDialogOpen} editLane={editCurrentLane} deleteLane={deleteCurrentLane} />) 
            : (<></>)}
            
        </Dialog>
    )
}

export default LaneDialog;