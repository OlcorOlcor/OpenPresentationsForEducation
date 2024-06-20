import {Button, Dialog, Grid} from "@mui/material";
import React, {useState} from "react";
import { Metadata } from "../Model/PresentationTypes";
import MetadataListContainer from "./MetadataListContainer";
import MetadataFormContainer from "./MetadataFormContainer";

interface MetadataDialogProps {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    metadata: Metadata[];
    setMetadata: React.Dispatch<React.SetStateAction<Metadata[]>>;
}

const MetadataDialog: React.FC<MetadataDialogProps> = ({dialogOpen, setDialogOpen, metadata, setMetadata}) => {
    const [selectedMetadataIndex, setSelectedMetadataIndex] = useState<number>(-1);
    
    function handleClose() {
        setDialogOpen(false);
    }

    function selectMetadata(index: number): void {
        setSelectedMetadataIndex(index);
    }

    function handleSubmit(name: string, source: string) {
        setMetadata(old => {
            let newMetadata = [...old];
            let newMetadataObject = {name: name, source: source};
            newMetadata[selectedMetadataIndex] = newMetadataObject;
            return newMetadata;
        });
    }

    function addMetadata() {
        setMetadata(old => {
            let newMetadata = [...old];
            newMetadata.push({name: "New", source: ""});
            return newMetadata;
        });
    }

    function deleteMetadata() {
        
    }
    return (
        <Dialog open={dialogOpen} onClose={handleClose}>
            <Grid container>
                <Grid item xs={6}>
                    <MetadataListContainer metadata={metadata} selectMetadata={selectMetadata} addMetadata={addMetadata} />
                </Grid>
                <Grid item xs={6}>
                    <MetadataFormContainer metadata={metadata} selectedMetadataIndex={selectedMetadataIndex} selectMetadata={selectMetadata} handleSubmit={handleSubmit} />
                </Grid>
            </Grid>
        </Dialog>
    )
} 

export default MetadataDialog;