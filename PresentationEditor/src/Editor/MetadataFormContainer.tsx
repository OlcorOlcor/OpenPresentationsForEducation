import { Button, FormControl, TextField } from "@mui/material";
import { Metadata } from "../Model/PresentationTypes";
import { useEffect, useState } from "react";

interface MetadataListContainerProps {
    metadata: Metadata[];
    selectedMetadataIndex: number;
    selectMetadata(index: number): void;
    handleSubmit(name: string, source: string): void;
}

const MetadataListContainer: React.FC<MetadataListContainerProps>  = ({metadata, selectedMetadataIndex, selectMetadata, handleSubmit}) => {
    const [name, setName] = useState<string>("");
    const [source, setSource] = useState<string>("");
    useEffect(() => {
        if (metadata[selectedMetadataIndex]) {
            setName(metadata[selectedMetadataIndex].name);
            setSource(metadata[selectedMetadataIndex].source);
        }
    }, [selectedMetadataIndex])
    
    function handleNameChange(e: any) {
        setName(e.target.value);
    }

    function handleSourceChange(e: any) {
        setSource(e.target.value);
    }
    return (
        <div style={{height: "100%"}}>
            <FormControl fullWidth margin="normal">
                <TextField
                    label="Name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    variant="outlined"
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField
                    label="Source"
                    name="source"
                    value={source}
                    onChange={handleSourceChange}
                    variant="outlined"
                />
            </FormControl>
            <Button type="submit" variant="contained" color="primary" onClick={() => handleSubmit(name, source)}>
                Save
            </Button>
        </div>
    )
}

export default MetadataListContainer;