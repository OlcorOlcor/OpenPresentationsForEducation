import {Avatar, Button, Dialog, DialogTitle, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import React, {useState} from "react";
import { Metadata } from "../Model/PresentationTypes";
import { Add } from "@mui/icons-material";
import MetadataFormDialog from "./MetadataFormDialog";

interface MetadataDialogProps {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    metadata: Metadata[];
    setMetadata: React.Dispatch<React.SetStateAction<Metadata[]>>;
}

const MetadataDialog: React.FC<MetadataDialogProps> = ({dialogOpen, setDialogOpen, metadata, setMetadata}) => {
    const [selectedMetadataIndex, setSelectedMetadataIndex] = useState<number>(-1);
    const [formDialogOpen, setFormDialogOpen] = useState<boolean>(false);

    function handleListItemClick(index: number) {
        setSelectedMetadataIndex(index);
        setFormDialogOpen(true);
    }

    function handleClose() {
        setDialogOpen(false);
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
        <Dialog onClose={handleClose} open={dialogOpen}>
        <DialogTitle>Global metadata</DialogTitle>
            <List sx={{ pt: 0 }}>
                {metadata.map((meta, i) => (
                <ListItem disablePadding key={i}>
                    <ListItemButton onClick={() => handleListItemClick(i)}>
                    <ListItemText primary={meta.name} />
                    </ListItemButton>
                </ListItem>
                ))}
                <ListItem disablePadding>
                <ListItemButton
                    autoFocus
                    onClick={() => addMetadata()}
                >
                    <ListItemAvatar>
                    <Avatar>
                        <Add />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add tag" />
                </ListItemButton>
                </ListItem>
            </List>
            { metadata[selectedMetadataIndex] !== undefined &&  metadata[selectedMetadataIndex] !== null ? (
                <MetadataFormDialog metadata={metadata[selectedMetadataIndex]} handleSubmit={handleSubmit} dialogOpen={formDialogOpen} setDialogOpen={setFormDialogOpen} deleteMetadata={deleteMetadata}></MetadataFormDialog>
                ) : (<></>)
            }
        </Dialog>
    )
} 

export default MetadataDialog;