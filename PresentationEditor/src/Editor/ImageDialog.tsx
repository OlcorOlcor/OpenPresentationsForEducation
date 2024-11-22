import { Dialog, Grid } from "@mui/material";
import React, { useState } from "react";
import ItemListContainer from "./ItemListContainer";
import { ImageFile } from "./ImageFile";

interface ImageDialogProps {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageDialog: React.FC<ImageDialogProps> = ({
    dialogOpen,
    setDialogOpen,
}) => {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);

    function cancel() {
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
                let img = new ImageFile(file.name, base64);
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

    function selectImage() {
        // TODO
    }

    function deleteImage() {
        console.log(images);
        // TODO
    }
    return (
        <Dialog open={dialogOpen} onClose={cancel} maxWidth="md" fullWidth>
            <Grid container style={{ height: "500px" }}>
                <Grid item xs={6} style={{ overflowY: "auto", height: "100%" }}>
                    <ItemListContainer items={images} selectItem={selectImage} addItem={addImage} deleteItem={deleteImage} selectedItemIndex={selectedImageIndex}></ItemListContainer>
                </Grid>
                <Grid item xs={6} style={{ height: "100%" }}>
                    
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default ImageDialog;