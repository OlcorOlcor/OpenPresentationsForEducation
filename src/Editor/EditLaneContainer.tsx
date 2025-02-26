import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    OverridableCardHeader,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Lane } from "../Model/PresentationModel";

interface EditLaneContainerProps {
    lanes: Lane[];
    selectedLaneIndex: number;
    handleSubmit(name: string, outputType: boolean): void;
    handleSelect(): void;
    handleCancel(): void;
}

const EditLaneContainer: React.FC<EditLaneContainerProps> = ({
    lanes,
    selectedLaneIndex,
    handleSubmit,
    handleSelect,
    handleCancel
}) => {
    const [dialogLane, setDialogLane] = useState<Lane>(
        lanes[selectedLaneIndex],
    );

    useEffect(() => {
        setDialogLane(lanes[selectedLaneIndex]);
    }, [selectedLaneIndex]);

    function handleNameChange(name: string) {
        setDialogLane((prev) => { return new Lane(prev.getContent(), name, prev.outputsAsPresentation()) });
    }

    function handleOutputTypeChange() {
        setDialogLane((prev) => { return new Lane(prev.getContent(), prev.getName(), !prev.outputsAsPresentation()) });
    }

    return (
        <Grid container direction="column" style={{height: "100%"}}>
            <Grid container xs item direction="column" spacing={4}>
                <Grid item style={{marginLeft: 10, marginRight: 10}}>
                    <TextField
                        id="Lane name"
                        variant="outlined"
                        label="Name"
                        value={dialogLane ? dialogLane.getName() : ""}
                        onChange={(e) => handleNameChange(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item style={{marginLeft: 10, marginRight: 10}}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={dialogLane ? dialogLane.outputsAsPresentation() : false}
                            />
                        }
                        label="Output as presentation"
                        onChange={handleOutputTypeChange}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item>
                    <Button color="primary" variant="contained" onClick={() => handleSubmit(dialogLane.getName(), dialogLane.outputsAsPresentation())}>
                        Save
                    </Button>
                </Grid>
                <Grid item>
                    <Button color="primary" variant="contained" onClick={() => handleSelect()}>
                        Select
                    </Button>
                </Grid>
                <Grid item>
                    <Button color="primary" variant="contained" onClick={() => handleCancel()}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EditLaneContainer;
