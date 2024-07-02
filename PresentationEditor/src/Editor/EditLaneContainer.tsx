import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Lane } from "../Model/PresentationModel";

interface EditLaneContainerProps {
    lanes: Lane[];
    selectedLaneIndex: number;
    handleSubmit(name: string, outputType: boolean): void;
}

const EditLaneContainer: React.FC<EditLaneContainerProps> = ({
    lanes,
    selectedLaneIndex,
    handleSubmit
}) => {
    const [dialogLane, setDialogLane] = useState<Lane>(
        lanes[selectedLaneIndex],
    );

    useEffect(() => {
        setDialogLane(lanes[selectedLaneIndex]);
    }, [selectedLaneIndex]);

    function handleNameChange(name: string) {
        setDialogLane((prev) => ({ ...prev, name: name }));
    }

    function handleOutputTypeChange() {
        setDialogLane((prev) => ({
            ...prev,
            outputAsPresentation: !prev.outputAsPresentation,
        }));
    }

    return (
        <Grid container direction="column">
            <Grid item style={{marginLeft: 10, marginRight: 10}}>
                <TextField
                    id="Lane name"
                    variant="outlined"
                    label="Name"
                    value={dialogLane ? dialogLane.name : ""}
                    onChange={(e) => handleNameChange(e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item style={{marginLeft: 10, marginRight: 10}}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={dialogLane ? dialogLane.outputAsPresentation : false}
                        />
                    }
                    label="Output as presentation"
                    onChange={handleOutputTypeChange}
                />
            </Grid>
            <Grid container spacing={4}>
                <Grid item>
                    <Button color="primary" variant="contained" onClick={() => handleSubmit(dialogLane.name, dialogLane.outputAsPresentation)}>
                        Confirm
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EditLaneContainer;
