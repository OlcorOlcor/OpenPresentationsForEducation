import { Button, FormControl, Grid, IconButton, TextField } from "@mui/material";
import { Metadata } from "../Model/PresentationTypes";
import { useEffect, useState } from "react";
import { Delete as DeleteIcon } from "@mui/icons-material";

interface MetadataListContainerProps {
    metadata: Metadata[];
    selectedMetadataIndex: number;
    selectMetadata(index: number): void;
    handleSubmit(name: string, attributes: object): void;
}

const MetadataListContainer: React.FC<MetadataListContainerProps>  = ({metadata, selectedMetadataIndex, selectMetadata, handleSubmit}) => {
    
    const [name, setName] = useState<string>("");
    const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
    const [numberOfKeysAdded, setNumberOfKeysAdded] = useState<number>(Object.keys(attributes).length as number + 1);

    useEffect(() => {
        if (metadata[selectedMetadataIndex]) {
            setName(metadata[selectedMetadataIndex].name);
            setAttributes(metadata[selectedMetadataIndex].attributes);
            setNumberOfKeysAdded(Object.keys(metadata[selectedMetadataIndex].attributes).length + 1)
        }
    }, [selectedMetadataIndex]);
    
    function handleNameChange(e: any) {
        setName(e.target.value);
    }

    function handleAttributeValueChange(key: string, value: string) {
        setAttributes((prev) => ({
          ...prev,
          [key]: value,
        }));
    };

    function addAttribute() {
        setAttributes(oldAttributes => {
            let newAttributes = {...oldAttributes};
            newAttributes["key" + numberOfKeysAdded] = "";
            setNumberOfKeysAdded(numberOfKeysAdded + 1);
            return newAttributes;
        });
    }

    function deleteAttribute(key: string) {
        setAttributes(oldAttributes => {
           let newAttributes = {...oldAttributes};
           delete newAttributes[key];
           return newAttributes;
        });
    };

    function handleAttributeChange(key: string, newKey: string, value: string) {
        setAttributes(oldAttributes => {
            let newAttributes = {...oldAttributes};
            delete newAttributes[key];
            newAttributes[newKey] = value;
            return newAttributes;
        });
    }

    return (
        <Grid container direction="column" style={{height: "100%"}}>
            <Grid item xs style={{height: "90%"}}>
                <FormControl fullWidth margin="normal">
                    <TextField label="Name" name="name" value={name} onChange={handleNameChange} variant="outlined" />
                </FormControl>
                {Object.entries(attributes).map(([key, value]) => (
                    <Grid item key={key} container spacing={1} alignItems="center">
                        <Grid item xs={5}>
                            <TextField label="Key" value={key} onChange={(e) => handleAttributeChange(key, e.target.value, value) } variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField label="Value" value={value} onChange={(e) => handleAttributeValueChange(key, e.target.value) } variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton onClick={() => deleteAttribute(key)} color="secondary">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
                <Grid item>
                    <Button variant="outlined" color="primary" onClick={addAttribute} fullWidth>
                        Add Attribute
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                <Button type="submit" variant="contained" color="primary" onClick={() => handleSubmit(name, attributes)}>
                    Save
                </Button>
            </Grid>
        </Grid>
    )
}

export default MetadataListContainer;