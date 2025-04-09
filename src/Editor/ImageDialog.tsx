import { Avatar, Dialog, DialogTitle, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tooltip } from "@mui/material";
import { Lane } from "../Model/PresentationModel";
import React, { useEffect, useState } from "react";
import { Add, Image } from "@mui/icons-material";
import LaneFormDialog from "./LaneFormDialogue";
import { ImageFile } from "../Model/PresentationTypes";
import ImageFormDialog from "./ImageFormDialog";

interface ImageDialogProps {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    images: ImageFile[];
    setImages: React.Dispatch<React.SetStateAction<ImageFile[]>>;
}

const ImageDialog: React.FC<ImageDialogProps> = ({dialogOpen, setDialogOpen, images, setImages}) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
    const [formDialogOpen, setFormDialogOpen] = useState<boolean>(false);

    function handleClose() {
        setDialogOpen(false);
    }

    async function addImage() {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";

        fileInput.onchange = async (event: Event) => {
            const file = (event.target as HTMLInputElement)?.files?.[0];
            if (file) {
                const base64 = await convertToBase64(file);
                let img = {name: file.name, fileBase64: base64}
                setImages((prevImages) => [...prevImages, img]);
            }
        };

        fileInput.click();
    }

    function convertToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }

    function deleteImage() {
        setImages(oldImages => {
            let newImages = oldImages.filter((_, index) => selectedImageIndex !== index);
            return newImages;
        });
        setDialogOpen(false);
    }

    function updateImage(name: string) {
        setImages(oldImages => {
            let newImages = [...oldImages]
            newImages[selectedImageIndex] = {name: name, fileBase64: newImages[selectedImageIndex].fileBase64};
            return newImages;
        });
    }
    
    function handleListItemClick(index: number) {
        setSelectedImageIndex(index);
        setFormDialogOpen(true);
    }

    return (
        <Dialog onClose={handleClose} open={dialogOpen}>
            <DialogTitle>Images</DialogTitle>
            <List sx={{ pt: 0 }}>
                {images.map((img, i) => (
                <ListItem disablePadding key={i}>
                    <Tooltip
                        title={
                            <img
                            src={img.fileBase64}
                            alt={img.name}
                            style={{ width: 100, height: 'auto', objectFit: 'contain' }}
                            />
                        }
                    arrow
                    placement="right"
                    >
                    <ListItemButton onClick={() => handleListItemClick(i)}>
                        <ListItemAvatar>
                        <Avatar>
                            <Image />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={img.name} />
                    </ListItemButton>
                    </Tooltip>
                </ListItem>
                ))}
                <ListItem disablePadding>
                <ListItemButton autoFocus onClick={addImage}>
                    <ListItemAvatar>
                    <Avatar>
                        <Add />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add image" />
                </ListItemButton>
                </ListItem>
            </List>
            {images[selectedImageIndex] !== undefined && images[selectedImageIndex] !== null 
            ? (<ImageFormDialog image={images[selectedImageIndex]} dialogOpen={formDialogOpen} setDialogOpen={setFormDialogOpen} deleteImage={deleteImage} handleSubmit={updateImage}></ImageFormDialog>) 
            : (<></>)}
        </Dialog>
    )
}

export default ImageDialog;