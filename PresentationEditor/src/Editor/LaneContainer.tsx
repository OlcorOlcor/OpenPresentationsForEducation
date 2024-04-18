import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select } from "@mui/material";
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
    }, [selectedLane]);

    function updateEditor() {
        const visitor = new MarkdownVisitor();
        visitor.visitSlideNode(slides[selectedSlideIndex]);
        setEditorData(visitor.getResult());
    }

    function selectLane(index: number) {
        setSelectedLaneIndex(index);
    }

    return (
            <Grid container direction="column" style={{height: "100%"}}>
                <Grid item xs={1} >
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel id="laneSelectLabel">Select Lane</InputLabel>
                                <Select labelId="laneSelectLabel" value={selectedLaneIndex} onChange={(e) => selectLane(e.target.value as number)}>
                                    {lanes.map((lane, i) =>(
                                        <MenuItem key={i} value={i} disabled={otherLaneIndex === i}>{lane.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" onClick={AddLane}>Add lane</Button>
                        </Grid>
                        <Grid item xs={8}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Preview" onChange={() => { setEditorView(!editorView); }}/>
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={11}>
                    <EditorModule editorData={editorData} setEditorData={setEditorData} slides={slides} setSlides={setSlides} selectedSlideIndex={selectedSlideIndex} setSelectedSlideIndex={setSelectedSlideIndex} editorView={editorView} />
                </Grid>
            </Grid>
    )
}

export default LaneContainer;