import { Dialog, Grid } from "@mui/material";
import { Lane } from "../Model/PresentationModel";
import React, { useEffect, useState } from "react";
import EditLaneContainer from "./EditLaneContainer";
import ItemListContainer from "./ItemListContainer";

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
    const [selectedLaneIndex, setSelectedLaneIndex] = useState<number>(-1);

    function handleClose() {
        if (selectedLaneIndex !== -1) {
            selectLane(selectedLaneIndex);
        }
        setDialogOpen(false);
    }

    function selectLaneIndex(index: number) {
        setSelectedLaneIndex(index);
    }

    function handleSubmit(name: string, outputType: boolean) {
        setLanes(prev => {
            let newLanes = [...prev];
            let newLane = new Lane(newLanes[selectedLaneIndex].slides, name, outputType);
            newLanes[selectedLaneIndex] = newLane;
            return newLanes;
        });
    }

    return (
        <Dialog open={dialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
            <Grid container style={{height: "500px"}}>
                <Grid item xs={6} style={{overflowY: "auto" , height: "100%"}}>
                    <ItemListContainer items={lanes} selectItem={selectLaneIndex} addItem={addLane} deleteItem={() => deleteLane(selectedLaneIndex)} selectedItemIndex={selectedLaneIndex}></ItemListContainer>
                </Grid>
                <Grid item xs={6} style={{height: "100%"}}>
                    <EditLaneContainer lanes={lanes} selectedLaneIndex={selectedLaneIndex} handleSubmit={handleSubmit}/>
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default LaneDialog;