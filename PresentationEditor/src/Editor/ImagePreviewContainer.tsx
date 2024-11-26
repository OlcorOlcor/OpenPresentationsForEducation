import React from "react";
import { ImageFile } from "../Model/PresentationTypes";
import { Box, TextField } from "@mui/material";

interface ImagePreviewContainerProps {
    image: ImageFile;
    updateImage(image: ImageFile): void;
}

const ImagePreviewContainer: React.FC<ImagePreviewContainerProps> = ({
    image,
    updateImage
}) => {

    function handleNameChange(name: string) {
        let img: ImageFile = {
            name: name,
            fileBase64: image.fileBase64
        }
        updateImage(img);
    }

    return (
        <Box alignContent="center">
            <Box width={300} height={300} display="flex" justifyContent="center" alignItems="center">
            <img
                src={image.fileBase64}
                alt="Preview"
                style={{ maxWidth: '300px', maxHeight: '300px' }}
            />
            </Box>
            <Box>
                <TextField style={{width: "95%"}}id="ImageName" variant="outlined" label="Name" value={image.name} onChange={(e) => handleNameChange(e.target.value)} />
            </Box>
        </Box>
    )
}

export default ImagePreviewContainer;