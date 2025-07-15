import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface CustomExportDialogProps {
    open: boolean;
    onClose: () => void;
    onExport: (customJs: string) => void;
}

const CustomExportDialog: React.FC<CustomExportDialogProps> = ({ open, onClose, onExport }) => {
    const [customJs, setCustomJs] = useState('');

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Custom Export</DialogTitle>
            <DialogContent>
                <TextField required margin="dense" id="name" name="name" label="Custom JavaScript" type="text" fullWidth variant="standard" value={customJs} onChange={(e) => setCustomJs(e.target.value)} size="small" />
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button color="primary" onClick={() => {onExport(customJs); onClose();}}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomExportDialog;
