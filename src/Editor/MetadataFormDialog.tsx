import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from "@mui/material";
import { Lane } from "../Model/PresentationModel";
import React, { useEffect, useState } from "react";
import { Metadata } from "../Model/PresentationTypes";
import { Delete } from "@mui/icons-material";

interface MetadataFormDialogProps {
    metadata: Metadata;
    handleSubmit(name: string, attributes: object): void;
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    deleteMetadata(): void;
}

const MetadataFormDialog: React.FC<MetadataFormDialogProps> = ({metadata, handleSubmit, dialogOpen, setDialogOpen, deleteMetadata}) => {
    const [name, setName] = useState<string>(metadata.name);
    const [localAttributes, setLocalAttributes] = useState<[string, string][]>([]);
    const [attributes, setAttributes] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        setName(metadata.name);
        let attrs: [string, string][] = [];
        for (const attr in metadata.attributes) {
            attrs.push([attr, metadata.attributes[attr]]);
        }
        setLocalAttributes(attrs);
    }, [metadata]);
    
    function handleClose() {
        let attrs: [string, string][] = [];
        for (const attr in metadata.attributes) {
            attrs.push([attr, metadata.attributes[attr]]);
        }
        setLocalAttributes(attrs);
        setName(metadata.name);
        setDialogOpen(false);
    }

    function handleFormSubmit() {
        let attributes: {[key: string]: any} = {};
        localAttributes.forEach(([attribute, value]) => {
            attributes[attribute] = value;
        });
        setLocalAttributes([]);
        setName("")
        handleSubmit(name, attributes);
        setDialogOpen(false);
    }

    function addAttribute() {
        setLocalAttributes(oldAttributes => {
            const newAttributes = [...oldAttributes];
            newAttributes.push(["attribute" + (newAttributes.length + 1), ""]);
            return newAttributes
        });
    }

    function deleteAttribute(index: number) {
        setLocalAttributes(oldAttributes => {
            const newAttributes = [...oldAttributes];
            newAttributes.splice(index, 1);
            return newAttributes;
        });
    }

    function handleAttributeChange(index: number, newAttribute: string) {
        setLocalAttributes(oldAttributes => {
            const newAttributes = [...oldAttributes];
            newAttributes[index][0] = newAttribute;
            return newAttributes;
        });
    }

    function handleAttributeValueChange(index: number, newValue: string) {
        setLocalAttributes(oldAttributes => {
            const newAttributes = [...oldAttributes];
            newAttributes[index][1] = newValue;
            return newAttributes;
        });
    }

    function deleteTag() {
        deleteMetadata();
        setDialogOpen(false)
    }

    return (
        <Dialog
            open={dialogOpen}
            onClose={handleClose}
        >
            <DialogTitle>Metadata Tag</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Here you can edit your selected metadata tag.
                </DialogContentText>
                <TextField required margin="dense" id="name" name="name" label="Name" type="text" fullWidth variant="standard" value={name} onChange={(e) => setName(e.target.value)}/>
                {localAttributes.map(([attribute, value], i) => (
                    <Box display="flex" gap={2} alignItems="center" mb={2}>
                        <TextField required label="Attribute" value={attribute} onChange={(e) => handleAttributeChange(i, e.target.value) } margin="dense" variant="standard" fullWidth size="small" />
                        <TextField label="Value" value={value} onChange={(e) => handleAttributeValueChange(i, e.target.value) } margin="dense" variant="standard" fullWidth size="small" />
                        <IconButton onClick={() => deleteAttribute(i)} color="secondary">
                            <Delete />
                        </IconButton>
                    </Box>
                ))}
                <Button onClick={addAttribute}>Add attribute</Button>
                <hr />
                <Button onClick={deleteTag} color="error">Delete tag</Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleFormSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default MetadataFormDialog;