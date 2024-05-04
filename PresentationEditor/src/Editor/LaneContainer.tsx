import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import EditorModule from "./EditorModule";
import { Lane, SlideElement } from "../Model/PresentationModel";
import { MarkdownVisitor } from "../Model/Visitors";
import LaneMenu from "./LaneMenu";

interface LaneContainerProps {
    lanes: Lane[];
    setLanes: React.Dispatch<React.SetStateAction<Lane[]>>;
    selectedLaneIndex: number;
    setSelectedLaneIndex: React.Dispatch<React.SetStateAction<number>>;
    otherLaneIndex: number;
    addLane(): void;
}


const LaneContainer: React.FC<LaneContainerProps> = ({lanes, setLanes, selectedLaneIndex, setSelectedLaneIndex, otherLaneIndex }) => {
    const [editorView, setEditorView] = useState<boolean>(true);
    const [editorData, setEditorData] = useState<string>("");
    const [slides, setSlides] = useState<SlideElement[]>(lanes[selectedLaneIndex].slides)
    const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
    const [switchedLane, setSwitchedLane] = useState<boolean>(false);
    const [slideMode, setSlideMode] = useState<boolean>(lanes[selectedLaneIndex].outputAsPresentation);

    useEffect(() => {
        if (switchedLane) {
            updateEditor();
        }
        setSwitchedLane(false);
    }, [slides]);

    useEffect(() => {
        updateEditor();
    }, [selectedSlideIndex]);

    useEffect(() => {
        // lanes[selectedLaneIndex].slides = slides;
        setSlides(lanes[selectedLaneIndex].slides);
        setSelectedSlideIndex(0);
        setSwitchedLane(true);
    }, [selectedLaneIndex]);

    useEffect(() => {
        setSlides(lanes[selectedLaneIndex].slides);
    }, [lanes])

	function addSlide() {
		setLanes(oldLanes => {
			let updatedLanes = [...oldLanes];
			updatedLanes.forEach(lane => {
				lane.slides = [...lane.slides, new SlideElement([])];
			});
			return updatedLanes;
		});
	}

	function addSlideAt(index: number) {
		setLanes(oldLanes => {
			let updatedLanes = [...oldLanes];
			updatedLanes.forEach(lane => {
				let newSlide = new SlideElement([]);
				lane.slides = [...lane.slides.slice(0, index + 1), newSlide, ...lane.slides.slice(index + 1)];
			})
			return updatedLanes;
		});
	}

    function updateEditor() {
        const visitor = new MarkdownVisitor();
        visitor.visitSlideNode(slides[selectedSlideIndex]);
        setEditorData(visitor.getResult());
    }

    return (
        <Grid container style={{height: "100%"}}>
            <Grid item xs={12}>
                <LaneMenu lanes={lanes} setLanes={setLanes} selectedLaneIndex={selectedLaneIndex} setSelectedLaneIndex={setSelectedLaneIndex} otherLaneIndex={otherLaneIndex} setSlideMode={setSlideMode} slides={slides} setSlides={setSlides} setEditorData={setEditorData} editorView={editorView} setEditorView={setEditorView} />
            </Grid>
            <Grid item xs={12} style={{ height: "100%" }}>
                <EditorModule editorData={editorData} setEditorData={setEditorData} slides={slides} setSlides={setSlides} selectedSlideIndex={selectedSlideIndex} setSelectedSlideIndex={setSelectedSlideIndex} editorView={editorView} slideMode={slideMode} addSlide={addSlide} addSlideAt={addSlideAt} />
            </Grid>
        </Grid>
    )
}

export default LaneContainer;