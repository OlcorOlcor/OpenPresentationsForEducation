import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogTitle,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Metadata } from "../Model/PresentationTypes";
import { Add, Delete } from "@mui/icons-material";

interface MetadataDialogProps {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    metadata: Metadata[];
    setMetadata: React.Dispatch<React.SetStateAction<Metadata[]>>;
}

const MetadataDialog: React.FC<MetadataDialogProps> = ({
    dialogOpen,
    setDialogOpen,
    metadata,
    setMetadata,
}) => {
    const [selectedMetadataIndex, setSelectedMetadataIndex] =
        useState<number>(-1);
    const [name, setName] = useState<string>(
        metadata[selectedMetadataIndex]?.name,
    );
    const [localAttributes, setLocalAttributes] = useState<[string, string][]>(
        [],
    );
    const [attributes, setAttributes] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (
            metadata[selectedMetadataIndex] != undefined &&
            metadata[selectedMetadataIndex] != null
        ) {
            setName(metadata[selectedMetadataIndex].name);
            setAttributes(metadata[selectedMetadataIndex].attributes);
            let attrs: [string, string][] = [];
            for (const attr in metadata[selectedMetadataIndex].attributes) {
                attrs.push([
                    attr,
                    metadata[selectedMetadataIndex].attributes[attr],
                ]);
            }
            setLocalAttributes(attrs);
        }
    }, [selectedMetadataIndex]);

    function handleListItemClick(index: number) {
        handleFormSubmit(() => {
            setSelectedMetadataIndex(index);
        });
    }

    function handleClose() {
        setDialogOpen(false);
    }

    function addMetadata() {
        setMetadata((old) => {
            let newMetadata = [...old];
            newMetadata.push({ name: "New tag", attributes: {} });
            return newMetadata;
        });
    }

    function deleteMetadata() {
        setMetadata((old) => {
            let newMetadata = old.filter(
                (_, index) => selectedMetadataIndex !== index,
            );
            if (selectedMetadataIndex > 0) {
                setSelectedMetadataIndex(selectedMetadataIndex - 1);
            }
            if (newMetadata.length === 0) {
                setSelectedMetadataIndex(-1);
            }
            return newMetadata;
        });
    }

    function addAttribute() {
        setLocalAttributes((oldAttributes) => {
            const newAttributes = [...oldAttributes];
            newAttributes.push(["attribute" + (newAttributes.length + 1), ""]);
            return newAttributes;
        });
    }

    function handleFormSubmit(callback?: () => void) {
        let attributes: { [key: string]: any } = {};
        localAttributes.forEach(([attribute, value]) => {
            attributes[attribute] = value;
        });
        setMetadata((old) => {
            let newMetadata = [...old];
            let newMetadataObject = { name: name, attributes: attributes };
            newMetadata[selectedMetadataIndex] = newMetadataObject;
            return newMetadata;
        });

        if (callback) {
            callback();
        }
    }

    function deleteAttribute(index: number) {
        setLocalAttributes((oldAttributes) => {
            const newAttributes = [...oldAttributes];
            newAttributes.splice(index, 1);
            return newAttributes;
        });
    }

    function handleAttributeChange(index: number, newAttribute: string) {
        setLocalAttributes((oldAttributes) => {
            const newAttributes = [...oldAttributes];
            newAttributes[index][0] = newAttribute;
            return newAttributes;
        });
    }

    function handleAttributeValueChange(index: number, newValue: string) {
        setLocalAttributes((oldAttributes) => {
            const newAttributes = [...oldAttributes];
            newAttributes[index][1] = newValue;
            return newAttributes;
        });
    }

    function deleteTag() {
        deleteMetadata();
        setDialogOpen(false);
    }

    return (
        <Dialog onClose={handleClose} open={dialogOpen} fullWidth maxWidth="md">
            <DialogTitle>Global metadata</DialogTitle>
            <Grid container sx={{ minHeight: 450, padding: 2 }}>
                <Grid item xs={4}>
                    <List sx={{ pt: 0 }}>
                        {metadata.map((meta, i) => (
                            <ListItem disablePadding key={i}>
                                <ListItemButton
                                    onClick={() => handleListItemClick(i)}
                                >
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
                </Grid>
                <Grid item xs={8}>
                    {metadata[selectedMetadataIndex] !== undefined &&
                    metadata[selectedMetadataIndex] !== null ? (
                        <Grid container direction={"column"} height={"100%"}>
                            <Grid item xs>
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
                                {localAttributes.map(
                                    ([attribute, value], i) => (
                                        <Box
                                            display="flex"
                                            gap={2}
                                            alignItems="center"
                                            mb={2}
                                        >
                                            <TextField
                                                required
                                                label="Attribute"
                                                value={attribute}
                                                onChange={(e) =>
                                                    handleAttributeChange(
                                                        i,
                                                        e.target.value,
                                                    )
                                                }
                                                margin="dense"
                                                variant="standard"
                                                fullWidth
                                                size="small"
                                            />
                                            <TextField
                                                label="Value"
                                                value={value}
                                                onChange={(e) =>
                                                    handleAttributeValueChange(
                                                        i,
                                                        e.target.value,
                                                    )
                                                }
                                                margin="dense"
                                                variant="standard"
                                                fullWidth
                                                size="small"
                                            />
                                            <IconButton
                                                onClick={() =>
                                                    deleteAttribute(i)
                                                }
                                                color="secondary"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    ),
                                )}
                                <Button onClick={addAttribute}>
                                    Add attribute
                                </Button>
                                <hr />
                                <Button onClick={deleteTag} color="error">
                                    Delete tag
                                </Button>
                            </Grid>
                            <Grid
                                item
                                style={{
                                    paddingLeft: "max",
                                    alignContent: "rigth",
                                }}
                            >
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    gap={4}
                                >
                                    <Button
                                        color="secondary"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        color="primary"
                                        onClick={() => handleFormSubmit()}
                                    >
                                        Save
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    ) : (
                        <p>Select a metadata tag to edit</p>
                    )}
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default MetadataDialog;
