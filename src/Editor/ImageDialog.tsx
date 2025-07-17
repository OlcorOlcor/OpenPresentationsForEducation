import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogTitle,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    selectClasses,
    TextField,
    Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Add, Image } from "@mui/icons-material";
import { ImageFile } from "../Model/PresentationTypes";

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
    setImages,
}) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
    const [name, setName] = useState<string>(images[selectedImageIndex]?.name);
    const [base64, setBase64] = useState<string>(
        images[selectedImageIndex]?.fileBase64,
    );

    useEffect(() => {
        if (
            images[selectedImageIndex] != undefined &&
            images[selectedImageIndex] != null
        ) {
            setName(images[selectedImageIndex].name);
            setBase64(images[selectedImageIndex].fileBase64);
        }
    }, [selectedImageIndex]);

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
                let img = { name: file.name, fileBase64: base64 };
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
        setImages((oldImages) => {
            let newImages = oldImages.filter(
                (_, index) => selectedImageIndex !== index,
            );
            return newImages;
        });
        setDialogOpen(false);
    }

    function updateImage() {
        setImages((oldImages) => {
            let newImages = [...oldImages];
            newImages[selectedImageIndex] = {
                name: name,
                fileBase64: newImages[selectedImageIndex].fileBase64,
            };
            return newImages;
        });
    }

    function handleListItemClick(index: number) {
        setSelectedImageIndex(index);
    }

    return (
        <Dialog onClose={handleClose} open={dialogOpen} fullWidth maxWidth="md">
            <DialogTitle>Images</DialogTitle>
            <Grid container sx={{ minHeight: 450, padding: 2 }}>
                <Grid item xs={4}>
                    <List sx={{ pt: 0 }}>
                        {images.map((img, i) => (
                            <ListItem disablePadding key={i}>
                                <Tooltip
                                    title={
                                        <img
                                            src={img.fileBase64}
                                            alt={img.name}
                                            style={{
                                                width: 100,
                                                height: "auto",
                                                objectFit: "contain",
                                            }}
                                        />
                                    }
                                    arrow
                                    placement="right"
                                >
                                    <ListItemButton
                                        onClick={() => handleListItemClick(i)}
                                    >
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
                </Grid>
                <Grid item xs={8}>
                    {images[selectedImageIndex] !== undefined &&
                    images[selectedImageIndex] !== null ? (
                        <Grid container direction="column">
                            <Grid item>
                                <TextField
                                    required
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Box
                                    width={300}
                                    height={300}
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <img
                                        src={
                                            images[selectedImageIndex]
                                                .fileBase64
                                        }
                                        alt="Preview"
                                        style={{
                                            maxWidth: "300px",
                                            maxHeight: "300px",
                                        }}
                                    />
                                </Box>
                                <hr />
                                <Button onClick={deleteImage} color="error">
                                    Delete image
                                </Button>
                            </Grid>
                            <Grid item>
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    gap={4}
                                >
                                    <Button
                                        onClick={handleClose}
                                        color="secondary"
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        onClick={updateImage}
                                        color="primary"
                                    >
                                        Save
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    ) : (
                        <p>Select an image to edit</p>
                    )}
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default ImageDialog;
