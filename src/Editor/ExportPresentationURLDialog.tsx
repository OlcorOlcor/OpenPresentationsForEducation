import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress, Typography } from "@mui/material";

interface SaveToURLDialogProps {
    open: boolean;
    onClose: () => void;
    savePresentation: (url: string) => void
}

const SaveToURLDialog: React.FC<SaveToURLDialogProps> = ({ open, onClose, savePresentation }) => {
    const [url, setURL] = useState("");

    function handleSubmit() {
        savePresentation(url);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Save Presentation to URL</DialogTitle>
            <DialogContent>
                <TextField required margin="dense" id="name" name="name" label="Destination URL" type="text" fullWidth variant="standard" value={url} onChange={(e) => setURL(e.target.value)} size="small" />
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SaveToURLDialog;
