import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Styles } from "../Model/PresentationTypes";

interface StyleURLDialogProps {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setStyle: React.Dispatch<React.SetStateAction<Styles>>;
}

const LaneFormDialog: React.FC<StyleURLDialogProps> = ({
    dialogOpen,
    setDialogOpen,
    setStyle,
}) => {
    const [URL, setURL] = useState<string>("");
    const [correctURL, setCorrectURL] = useState<boolean>(true);
    function handleClose() {
        setDialogOpen(false);
    }

    function handleSubmit() {
        console.log(URL);
        fetch(URL)
            .then((res) => {
                const contentType = res.headers.get("Content-Type");
                if (!res.ok || !contentType?.includes("text/css")) {
                    throw new Error(`Unexpected content type: ${contentType}`);
                }
                return res.text();
            })
            .then((text) => {
                setStyle({ name: "styleFromURL.css", content: text });
                setCorrectURL(true);
                setURL("");
                setDialogOpen(false);
            })
            .catch((err) => {
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
                <TextField
                    required
                    margin="dense"
                    id="style"
                    name="Style"
                    label="Style URL"
                    type="url"
                    fullWidth
                    variant="standard"
                    value={URL}
                    onChange={(e) => setURL(e.target.value)}
                    size="small"
                />
                {correctURL ? <></> : <p>Incorrect URL submitted!</p>}
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LaneFormDialog;
