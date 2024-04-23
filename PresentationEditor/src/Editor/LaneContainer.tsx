import { Dialog, Checkbox, Fab, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, DialogTitle, TextField, Button } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import EditorModule from "./EditorModule";
import { Lane, SlideElement } from "../Model/PresentationModel";
import { MarkdownVisitor } from "../Model/Visitors";

interface LaneContainerProps {
    lanes: Lane[];
    setLanes: React.Dispatch<React.SetStateAction<Lane[]>>;
    selectedLane: Lane;
    setSelectedLane: React.Dispatch<React.SetStateAction<Lane>>;
    selectedLaneIndex: number;
    setSelectedLaneIndex: React.Dispatch<React.SetStateAction<number>>;
    otherLaneIndex: number;
    AddLane(): void;
}


const LaneContainer: React.FC<LaneContainerProps> = ({lanes, setLanes, selectedLane, setSelectedLane, selectedLaneIndex, setSelectedLaneIndex, otherLaneIndex, AddLane}) => {
    const [editorView, setEditorView] = useState<boolean>(true);
    const [editorData, setEditorData] = useState<string>("");
    const [slides, setSlides] = useState<SlideElement[]>(selectedLane.slides)
    const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
    const [switchedLane, setSwitchedLane] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [slideMode, setSlideMode] = useState<boolean>(selectedLane.outputAsPresentation);
    const [dialogLane, setDialogLane] = useState<Lane>(selectedLane);
    useEffect(() => {
        if (switchedLane) {
            updateEditor();
        }
        setSwitchedLane(false);
    }, [slides])

    useEffect(() => {
        updateEditor();
    }, [selectedSlideIndex]);

    useEffect(() => {
        selectedLane.slides = slides;
        setSelectedLane(lanes[selectedLaneIndex]);
    }, [selectedLaneIndex]);

    useEffect(() => {
        setSlides(selectedLane.slides);
        setSelectedSlideIndex(0);
        setSwitchedLane(true);
        setDialogLane(selectedLane);
    }, [selectedLane]);

    function updateEditor() {
        const visitor = new MarkdownVisitor();
        visitor.visitSlideNode(slides[selectedSlideIndex]);
        setEditorData(visitor.getResult());
    }

    function selectLane(index: number) {
        setSelectedLaneIndex(index);
    }

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

    function handleNameChange(name: string) {
        setDialogLane(prev => ({ ...prev, name: name }));
    };

    function handleOutputTypeChange() {
        setDialogLane(prev => (
            {...prev, outputAsPresentation: !prev.outputAsPresentation}
        ));
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

    return (
            <Grid container direction="column" style={{height: "100%"}}>
                <Grid item xs={1} >
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
                </Grid>
                <Grid item xs={11}>
                    <EditorModule editorData={editorData} setEditorData={setEditorData} slides={slides} setSlides={setSlides} selectedSlideIndex={selectedSlideIndex} setSelectedSlideIndex={setSelectedSlideIndex} editorView={editorView} slideMode={slideMode}/>
                </Grid>
            </Grid>
    )
}

export default LaneContainer;