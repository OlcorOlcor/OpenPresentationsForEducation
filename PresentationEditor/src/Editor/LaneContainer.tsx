import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import EditorModule from "./EditorModule";
import { SlideElement } from "../Model/PresentationModel";
import { MarkdownVisitor } from "../Model/Visitors";


const LaneContainer = () => {
    const [editorView, setEditorView] = useState<boolean>(true);
    const [editorData, setEditorData] = useState<string>("");
    const [slides, setSlides] = useState<SlideElement[]>([new SlideElement([])])
    const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);

    useEffect(() => {
        updateEditor();
    }, [selectedSlideIndex]);

    function updateEditor() {
        const visitor = new MarkdownVisitor();
        visitor.visitSlideNode(slides[selectedSlideIndex]);
        setEditorData(visitor.getResult());
    }

    return (
            <Grid container direction="column" style={{height: "100%"}}>
                <Grid item xs={1} >
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Preview" onChange={() => { setEditorView(!editorView); }}/>
                    </FormGroup>
                </Grid>
                <Grid item xs={11}>
                    <EditorModule editorData={editorData} setEditorData={setEditorData} slides={slides} setSlides={setSlides} selectedSlideIndex={selectedSlideIndex} setSelectedSlideIndex={setSelectedSlideIndex} editorView={editorView} />
                </Grid>
            </Grid>
    )
}

export default LaneContainer;