import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { Styles } from "../Model/PresentationTypes";

interface StyleURLDialogProps {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setStyle: React.Dispatch<React.SetStateAction<Styles>>;
}

const LaneFormDialog: React.FC<StyleURLDialogProps> = ({dialogOpen, setDialogOpen, setStyle}) => {
    const [URL, setURL] = useState<string>("");
    const [correctURL, setCorrectURL] = useState<boolean>(true);
    function handleClose() {
        setDialogOpen(false);
    }

    function handleSubmit() {
        console.log(URL);
        fetch(URL)
        .then(res => {
            const contentType = res.headers.get("Content-Type");
            if (!res.ok || !contentType?.includes("text/css")) {
                throw new Error(`Unexpected content type: ${contentType}`);
            }
            return res.text();
        })
        .then(text => {
            setStyle({ name: "styleFromURL.css", content: text });
            setCorrectURL(true);
            setURL("");
            setDialogOpen(false);
        })
        .catch(err => {
            setCorrectURL(false);
            console.error("Failed to fetch CSS:", err);
        });
    }

    return (
        <Dialog open={dialogOpen} onClose={handleClose}>
            <DialogTitle>Style from URL</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter a URL of your style sheet.
                </DialogContentText>
                <TextField autoFocus required margin="dense" id="UTL" name="UTL" label="Url" type="url" fullWidth variant="standard" value={URL} onChange={(e) => setURL(e.target.value)}/>
                {correctURL ? (<></>) : (<p>Incorrect URL submitted!</p>)}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default LaneFormDialog;