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

const LaneContainer: React.FC<LaneContainerProps> = ({
    lanes,
    setLanes,
    selectedLaneIndex,
    setSelectedLaneIndex,
    otherLaneIndex,
}) => {
    const [editorView, setEditorView] = useState<boolean>(true);
    const [editorData, setEditorData] = useState<string>("");
    const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
    const [slideMode, setSlideMode] = useState<boolean>(
        lanes[selectedLaneIndex].outputAsPresentation,
    );

    useEffect(() => {
        updateEditor();
    }, [selectedSlideIndex]);

    useEffect(() => {
        setSelectedSlideIndex(0);
    }, [selectedLaneIndex]);

    function addSlide() {
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            updatedLanes.forEach((lane) => {
                lane.slides = [...lane.slides, new SlideElement([])];
            });
            return updatedLanes;
        });
    }

    function addSlideAt(index: number) {
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            updatedLanes.forEach((lane) => {
                let newSlide = new SlideElement([]);
                lane.slides = [
                    ...lane.slides.slice(0, index + 1),
                    newSlide,
                    ...lane.slides.slice(index + 1),
                ];
            });
            return updatedLanes;
        });
    }

    function deleteSlideAt(index: number) {
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            updatedLanes.forEach((lane) => {
                let updatedSlides = lane.slides.filter(
                    (_, slideIndex) => slideIndex !== index,
                );
                lane.slides = updatedSlides;
            });
            if (selectedSlideIndex > 0) {
                setSelectedSlideIndex(selectedSlideIndex - 1);
            }
            return updatedLanes;
        });
    }

    function setSlideActive(index: number) {
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            let updatedSlides = [...updatedLanes[selectedLaneIndex].slides];
            let updatedSlide = new SlideElement(updatedSlides[index].content);
            updatedSlide.active = !updatedSlides[index].active;
            updatedSlides[index] = updatedSlide;
            updatedLanes[selectedLaneIndex].slides = updatedSlides;
            return updatedLanes;
        });
    }

    function updateEditor() {
        const visitor = new MarkdownVisitor();
        visitor.visitSlideNode(
            lanes[selectedLaneIndex].slides[selectedSlideIndex],
        );
        setEditorData(visitor.getResult());
    }

    return (
        <Grid container style={{ height: "100%" }}>
            <Grid item xs={12}>
                <LaneMenu
                    lanes={lanes}
                    setLanes={setLanes}
                    selectedLaneIndex={selectedLaneIndex}
                    setSelectedLaneIndex={setSelectedLaneIndex}
                    otherLaneIndex={otherLaneIndex}
                    setSlideMode={setSlideMode}
                    setEditorData={setEditorData}
                    editorView={editorView}
                    setEditorView={setEditorView}
                />
            </Grid>
            <Grid item xs={12} style={{ height: "100%" }}>
                <EditorModule
                    editorData={editorData}
                    setEditorData={setEditorData}
                    slides={lanes[selectedLaneIndex].slides}
                    selectedSlideIndex={selectedSlideIndex}
                    setSelectedSlideIndex={setSelectedSlideIndex}
                    editorView={editorView}
                    slideMode={slideMode}
                    addSlide={addSlide}
                    addSlideAt={addSlideAt}
                    setSlideActive={setSlideActive}
                    deleteSlideAt={deleteSlideAt}
                />
            </Grid>
        </Grid>
    );
};

export default LaneContainer;
