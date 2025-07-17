import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";
import { Lane } from "../Model/PresentationModel";

interface RevealExportDialogProps {
    lanes: Lane[];
    open: boolean;
    onClose: () => void;
    exportPresentationAsReveal(main: Lane, secondary: Lane): void;
}

const RevealExportDialog: React.FC<RevealExportDialogProps> = ({
    lanes,
    open,
    onClose,
    exportPresentationAsReveal,
}) => {
    const [selectedMainLaneIndex, setSelectedMainLaneIndex] =
        useState<number>(0);
    const [selectedSecondLaneIndex, setSelectedSecondLaneIndex] =
        useState<number>(0);

    function handleMainLaneChange(e: any) {
        setSelectedMainLaneIndex(e.target.value as number);
    }

    function handleSecondLaneChange(e: any) {
        setSelectedSecondLaneIndex(e.target.value as number);
    }

    function submit() {
        exportPresentationAsReveal(
            lanes[selectedMainLaneIndex],
            lanes[selectedSecondLaneIndex],
        );
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Reveal Export</DialogTitle>
            <DialogContent>
                <FormControl
                    fullWidth
                    size="small"
                    style={{ marginTop: "1%", marginBottom: "5%" }}
                >
                    <InputLabel id="laneSelectLabel">Main lane:</InputLabel>
                    <Select
                        labelId="laneSelectLabel"
                        id="mainLaneSelect"
                        value={selectedMainLaneIndex}
                        label="Main lane:"
                        onChange={handleMainLaneChange}
                    >
                        {lanes.map((lane, index) => (
                            <MenuItem key={index} value={index}>
                                {lane.getName()}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                    <InputLabel id="laneSelectLabel">
                        Secondary lane (Speaker notes):
                    </InputLabel>
                    <Select
                        labelId="laneSelectLabel"
                        id="secondaryLaneSelect"
                        value={selectedSecondLaneIndex}
                        label="Secondary lane (Speaker notes)"
                        onChange={handleSecondLaneChange}
                    >
                        {lanes.map((lane, index) => (
                            <MenuItem key={index} value={index}>
                                {lane.getName()}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button
                    color="primary"
                    onClick={() => {
                        submit();
                        onClose();
                    }}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RevealExportDialog;
