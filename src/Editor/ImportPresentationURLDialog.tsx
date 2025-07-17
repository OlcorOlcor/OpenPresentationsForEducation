import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";

interface ImportPresentationURLDialogProps {
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
    importPresentation: (file: File) => void;
}

const ImportPresentationURLDialog: React.FC<
    ImportPresentationURLDialogProps
> = ({ dialogOpen, setDialogOpen, importPresentation }) => {
    const [url, setUrl] = useState("");

    const handleClose = () => {
        setDialogOpen(false);
        setUrl("");
    };

    const handleImport = () => {
        if (!url) {
            return;
        }

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch presentation.");
                return res.json();
            })
            .then((blob) => {
                const file = new File([blob], "imported_presentation.json", {
                    type: "application/json",
                });
                importPresentation(file);
                handleClose();
            })
            .catch((err) => {
                console.error("Error importing from URL:", err);
                alert(
                    "Failed to load presentation from URL. Make sure it is a valid JSON file.",
                );
            });
    };

    return (
        <Dialog open={dialogOpen} onClose={handleClose}>
            <DialogTitle>Import Presentation from URL</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="Presentation URL"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    size="small"
                />
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button color="primary" onClick={handleImport}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportPresentationURLDialog;
