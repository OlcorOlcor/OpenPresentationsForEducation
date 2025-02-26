import {Button, Dialog, Grid} from "@mui/material";
import React, {useState} from "react";
import { Metadata } from "../Model/PresentationTypes";
import ItemListContainer from "./ItemListContainer";
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

    function handleSubmit(name: string, attributes: object) {
        setMetadata(old => {
            let newMetadata = [...old];
            let newMetadataObject = {name: name, attributes: attributes};
            newMetadata[selectedMetadataIndex] = newMetadataObject;
            return newMetadata;
        });
    }

    function addMetadata() {
        setMetadata(old => {
            let newMetadata = [...old];
            newMetadata.push({name: "New tag", attributes: {}});
            return newMetadata;
        });
    }

    function deleteMetadata() {
       setMetadata(old => {
            let newMetadata = old.filter((_, index) => selectedMetadataIndex !== index);
            if (selectedMetadataIndex > 0) {
                setSelectedMetadataIndex(selectedMetadataIndex - 1);
            }
            if (newMetadata.length === 0) {
                setSelectedMetadataIndex(-1);
            }
            return newMetadata;
       });
    }

    return (
        <Dialog open={dialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
            <Grid container style={{height: "500px"}}>
                <Grid item xs={6} style={{overflowY: "auto" , height: "100%"}}>
                    <ItemListContainer items={metadata} selectItem={selectMetadata} addItem={addMetadata} deleteItem={deleteMetadata} selectedItemIndex={selectedMetadataIndex}/>
                </Grid>
                <Grid item xs={6} style={{height: "100%"}}>
                    {selectedMetadataIndex !== -1 ? (
                        <MetadataFormContainer metadata={metadata} selectedMetadataIndex={selectedMetadataIndex} selectMetadata={selectMetadata} handleSubmit={handleSubmit} />
                    ) : <div></div>
                    }
                </Grid>
            </Grid>
        </Dialog>
    )
} 

export default MetadataDialog;