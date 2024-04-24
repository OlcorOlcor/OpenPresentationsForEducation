import { Button, Checkbox, Dialog, DialogTitle, Fab, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Lane, Presentation, SlideElement } from "../Model/PresentationModel";
import React, { ChangeEvent, useEffect, useState } from "react";
import { PresentationParser } from "../Model/PresentationParser";
import { MarkdownVisitor } from "../Model/Visitors";
import EditIcon from "@mui/icons-material/Edit";

interface LaneMenuProps {
    lanes: Lane[];
    setLanes: React.Dispatch<React.SetStateAction<Lane[]>>;
    selectedLane: Lane;
    setSelectedLane: React.Dispatch<React.SetStateAction<Lane>>;
    selectedLaneIndex: number;
    setSelectedLaneIndex: React.Dispatch<React.SetStateAction<number>>;
    otherLaneIndex: number;
    setSlideMode: React.Dispatch<React.SetStateAction<boolean>>;
    slides: SlideElement[];
    setSlides: React.Dispatch<React.SetStateAction<SlideElement[]>>;
    setEditorData: React.Dispatch<React.SetStateAction<string>>;
    editorView: boolean;
    setEditorView: React.Dispatch<React.SetStateAction<boolean>>;
}

const LaneMenu: React.FC<LaneMenuProps> = ({lanes, setLanes, selectedLane, setSelectedLane, selectedLaneIndex, setSelectedLaneIndex, otherLaneIndex, setSlideMode, slides, setSlides, setEditorData, editorView, setEditorView}) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [dialogLane, setDialogLane] = useState<Lane>(selectedLane);

    useEffect(() => {
        setDialogLane(selectedLane);
    }, [selectedLane])

    function showSettings() {
        setDialogOpen(true);
    }

    function handleClose() {
        setLanes(prev => {
            let updated = [...prev];
            updated[selectedLaneIndex] = dialogLane;
            return updated;
        });
        setSlideMode(dialogLane.outputAsPresentation);
        setDialogOpen(false);
    }

    function deleteLane() {
        setLanes(prev => {
            let updated = [...prev];
            updated.splice(selectedLaneIndex, 1);
            setDialogOpen(false);

            if (updated.length <= 1) {
                setSelectedLaneIndex(-1);
            } else if (selectedLaneIndex - 1 === otherLaneIndex) {
                if (selectedLaneIndex <= updated.length) {
                    setSelectedLaneIndex(selectedLaneIndex);
                } else {
                    setSelectedLaneIndex(otherLaneIndex - 1);
                }
            } else {
                setSelectedLaneIndex(selectedLaneIndex - 1);
            }

            return updated;
        })
    }

    function handleNameChange(name: string) {
        setDialogLane(prev => ({ ...prev, name: name }));
    };

    function handleOutputTypeChange() {
        setDialogLane(prev => (
            {...prev, outputAsPresentation: !prev.outputAsPresentation}
        ));
    }
    
    const importFile = (event: ChangeEvent<HTMLInputElement>) => {
        let element = event.target as HTMLInputElement;
        let file = element.files?.[0];
        if (!file) {
          return;
        }
        let reader = new FileReader();
    
        reader.onload = (e) => {
          let content = e.target?.result as string;
          let pp = new PresentationParser(JSON.parse(content));
          let presentation = pp.GetPresentation();
          let parsedSlides = (presentation as Presentation).getSlides();
          setSlides(parsedSlides);
          let visitor = new MarkdownVisitor();
          visitor.visitSlideNode((presentation as Presentation).getSlides()[0]);
          setEditorData(visitor.getResult());
        }
        reader.readAsText(file);
        setDialogOpen(false);
    }

    function selectLane(index: number) {
        setSelectedLaneIndex(index);
    }
return (
    <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={4}>
            <FormControl fullWidth>
                <InputLabel id="laneSelectLabel">Select Lane</InputLabel>
                <Select labelId="laneSelectLabel" value={selectedLaneIndex} onChange={(e) => selectLane(e.target.value as number)}>
                    {lanes.map((lane, i) =>(
                        <MenuItem key={i} value={i} disabled={otherLaneIndex === i}>{lane.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={4}>
            <Fab color="secondary" onClick={showSettings}><EditIcon /></Fab>
            <Dialog open={dialogOpen} onClose={handleClose}>
                <DialogTitle>Lane settings</DialogTitle>
                <div>
                    <div>
                        <input type="file" id="fileInput" onChange={importFile} />
                    </div>
                    <div>
                        <TextField id="Lane name" variant="standard" label="Name" value={dialogLane.name} onChange={(e) => handleNameChange(e.target.value)}/>
                    </div>
                    <div>
                        <FormControlLabel control={<Checkbox checked={dialogLane.outputAsPresentation}/>} label="Output as presentation" onChange={handleOutputTypeChange}/>
                    </div>
                    <Grid container>
                        <Grid item xs={6}>
                            <Button color="primary" onClick={handleClose}>Confirm</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button color="error" onClick={deleteLane}>Delete</Button>
                        </Grid>
                    </Grid>
                </div>
            </Dialog>
        </Grid>
        <Grid item xs={4}>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Preview" onChange={() => { setEditorView(!editorView); }}/>
            </FormGroup>
        </Grid>
    </Grid>
)
}

export default LaneMenu;