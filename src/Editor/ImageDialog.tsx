import { Dialog, Grid } from "@mui/material";
import React, { useState } from "react";
import ItemListContainer from "./ItemListContainer";
import { ImageFile } from "../Model/PresentationTypes";
import ImagePreviewContainer from "./ImagePreviewContainer";


interface ImageDialogProps {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    images: ImageFile[];
    setImages: React.Dispatch<React.SetStateAction<ImageFile[]>>;
}

const ImageDialog: React.FC<ImageDialogProps> = ({
    dialogOpen,
    setDialogOpen,
    images,
    setImages
}) => {
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

    function selectImage(index: number) {
        setSelectedImageIndex(index);
    }

    function deleteImage() {
        setImages(oldImages => {
            let newImages = oldImages.filter((_, index) => selectedImageIndex !== index);
            if (selectedImageIndex > 0) {
                setSelectedImageIndex(selectedImageIndex - 1);
            }
            if (newImages.length === 0) {
                setSelectedImageIndex(-1);
            }

            return newImages;
        });
    }

    function updateImage(image: ImageFile) {
        setImages(oldImages => {
            let newImages = [...oldImages]
            newImages[selectedImageIndex] = image;
            return newImages;
        })
    }

    return (
        <Dialog open={dialogOpen} onClose={cancel} maxWidth="md" fullWidth>
            <Grid container style={{ height: "500px" }}>
                <Grid item xs={6} style={{ overflowY: "auto", height: "100%" }}>
                    <ItemListContainer items={images} selectItem={selectImage} addItem={addImage} deleteItem={deleteImage} selectedItemIndex={selectedImageIndex}></ItemListContainer>
                </Grid>
                <Grid item xs={6} style={{ height: "100%" }}>
                    { selectedImageIndex !== -1 ?
                        <ImagePreviewContainer image={images[selectedImageIndex]} updateImage={updateImage}></ImagePreviewContainer>
                        : <div></div>
                    }
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default ImageDialog;