import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from "@mui/material";
import { Lane } from "../Model/PresentationModel";
import React, { useEffect, useState } from "react";
import { ImageFile, Metadata } from "../Model/PresentationTypes";
import { Delete } from "@mui/icons-material";

interface ImageFormDialogProps {
    image: ImageFile;
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    deleteImage(): void;
    handleSubmit(name: string): void;
}

const ImageFormDialog: React.FC<ImageFormDialogProps> = ({image, dialogOpen, setDialogOpen, deleteImage, handleSubmit}) => {
    const [name, setName] = useState<string>(image.name);
    const [base64, setBase64] = useState<string>(image.fileBase64);

    useEffect(() => {
        setName(image.name);
        setBase64(image.fileBase64);
    }, [image]);
    
    function handleClose() {
        setName(image.name);
        setBase64(image.fileBase64)
        setDialogOpen(false);
    }

    function handleFormSubmit() {
        setName(image.name);
        setBase64(image.fileBase64);
        handleSubmit(name);
        setDialogOpen(false);
    }

    return (
        <Dialog
            open={dialogOpen}
            onClose={handleClose}
        >
            <DialogTitle>Image</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Here you view the image and change its name.
                </DialogContentText>
                <TextField required margin="dense" id="name" name="name" label="Name" type="text" fullWidth variant="standard" value={name} onChange={(e) => setName(e.target.value)}/>
                <Box width={300} height={300} display="flex" justifyContent="center" alignItems="center">
                    <img
                        src={image.fileBase64}
                        alt="Preview"
                        style={{ maxWidth: '300px', maxHeight: '300px' }}
                    />
                </Box>
                <hr />
                <Button onClick={deleteImage} color="error">Delete image</Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button onClick={handleFormSubmit} color="primary">Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ImageFormDialog;