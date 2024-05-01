import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import EditorModule from "./EditorModule";
import { Lane, SlideElement } from "../Model/PresentationModel";
import { MarkdownVisitor } from "../Model/Visitors";
import LaneMenu from "./LaneMenu";

interface LaneContainerProps {
    lanes: Lane[];
    setLanes: React.Dispatch<React.SetStateAction<Lane[]>>;
    selectedLane: Lane;
    setSelectedLane: React.Dispatch<React.SetStateAction<Lane>>;
    selectedLaneIndex: number;
    setSelectedLaneIndex: React.Dispatch<React.SetStateAction<number>>;
    otherLaneIndex: number;
    addLane(): void;
}


const LaneContainer: React.FC<LaneContainerProps> = ({lanes, setLanes, selectedLane, setSelectedLane, selectedLaneIndex, setSelectedLaneIndex, otherLaneIndex }) => {
    const [editorView, setEditorView] = useState<boolean>(true);
    const [editorData, setEditorData] = useState<string>("");
    const [slides, setSlides] = useState<SlideElement[]>(selectedLane.slides)
    const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
    const [selectedSlide, setSelectedSlide] = useState<SlideElement>(slides[selectedSlideIndex]);
    const [switchedLane, setSwitchedLane] = useState<boolean>(false);
    const [slideMode, setSlideMode] = useState<boolean>(selectedLane.outputAsPresentation);

    useEffect(() => {
        if (switchedLane) {
            updateEditor();
        }
        setSwitchedLane(false);
    }, [slides])

    useEffect(() => {
        console.log("SELECTED SLIDE HAS BEEN CHANGED TO");
        console.log(selectedSlide);
        updateEditor();
    }, [selectedSlide]);

    useEffect(() => {
        console.log("CHANGING SLIDE INDEX")
        setSelectedSlide(slides[selectedSlideIndex]);
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
        visitor.visitSlideNode(selectedSlide);
        console.log("SETTING EDITOR DATA");
        setEditorData(visitor.getResult());
    }

    return (
        <Grid container style={{height: "100%"}}>
            <Grid item xs={12}>
                <LaneMenu lanes={lanes} setLanes={setLanes} selectedLane={selectedLane} setSelectedLane={setSelectedLane} selectedLaneIndex={selectedLaneIndex} setSelectedLaneIndex={setSelectedLaneIndex} otherLaneIndex={otherLaneIndex} setSlideMode={setSlideMode} slides={slides} setSlides={setSlides} setEditorData={setEditorData} editorView={editorView} setEditorView={setEditorView} />
            </Grid>
            <Grid item xs={12} style={{ height: "100%" }}>
                <EditorModule editorData={editorData} setEditorData={setEditorData} slides={slides} setSlides={setSlides} selectedSlideIndex={selectedSlideIndex} setSelectedSlideIndex={setSelectedSlideIndex} selectedSlide={selectedSlide} setSelectedSlide={setSelectedSlide} editorView={editorView} slideMode={slideMode} addSlide={addSlide} addSlideAt={addSlideAt} />
            </Grid>
        </Grid>
    )
}

export default LaneContainer;