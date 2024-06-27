import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditorModule from "./EditorModule";
import { Lane, SlideElement } from "../Model/PresentationModel";
import { AnalysisVisitor, MarkdownVisitor } from "../Model/Visitors";
import LaneMenu from "./LaneMenu";
import { MarkdownParser } from "../Model/MarkdownParser";
import { PresentationParser } from "../Model/PresentationParser";
import { Constraints } from "../Model/PresentationTypes";

interface LaneContainerProps {
    lanes: Lane[];
    setLanes: React.Dispatch<React.SetStateAction<Lane[]>>;
    selectedLaneIndex: number;
    setSelectedLaneIndex: React.Dispatch<React.SetStateAction<number>>;
    otherLaneIndex: number;
    addLane(): void;
    deleteLane(index: number): void;
    imported: boolean;
    setImported: React.Dispatch<React.SetStateAction<boolean>>;
    constraints: Constraints;
}

const LaneContainer: React.FC<LaneContainerProps> = ({
    lanes,
    setLanes,
    selectedLaneIndex,
    setSelectedLaneIndex,
    otherLaneIndex,
    deleteLane,
    imported,
    setImported,
    constraints
}) => {
    const [editorView, setEditorView] = useState<boolean>(true);
    const [editorData, setEditorData] = useState<string>("");
    const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
    const [slideAnalysis, setSlideAnalysis] = useState<Constraints>({words: 0, characters: 0, images: 0, links: 0, headings: 0, bullet_points: 0});
    const [slideMode, setSlideMode] = useState<boolean>(
        lanes[selectedLaneIndex].outputAsPresentation,
    );

    useEffect(() => {
        if (imported) {
            updateEditor();
            setImported(false);
        }
    }, [imported]);

    useEffect(() => {
        updateEditor();
    }, [selectedSlideIndex, selectedLaneIndex]);
    useEffect(() => {
        setSelectedSlideIndex(0);
    }, [selectedLaneIndex]);

    useEffect(() => {
        regenerateSlide(selectedSlideIndex);
    }, [editorData])

    function addSlide() {
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            updatedLanes.forEach((lane) => {
                lane.slides = [...lane.slides, null];
            });
            return updatedLanes;
        });
    }

    function addSlideAt(index: number) {
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            updatedLanes.forEach((lane) => {
                lane.slides = [
                    ...lane.slides.slice(0, index + 1),
                    null,
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
            let updatedSlide = (updatedSlides[index] == null) ? new SlideElement([]) : new SlideElement(updatedSlides[index]!.content);
            updatedSlide.active = (updatedSlides[index] == null) ? true : !updatedSlides[index]!.active;
            updatedSlides[index] = updatedSlide;
            updatedLanes[selectedLaneIndex].slides = updatedSlides;
            return updatedLanes;
        });
    }

    function regenerateSlide(index: number) {
        let markdownParser = new MarkdownParser();
        let jsonSlides = markdownParser.parseMarkdown(editorData);
        let presentationParser = new PresentationParser();
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            let updatedSlides = [...updatedLanes[selectedLaneIndex].slides];
            let updatedSlide = presentationParser.getSlides(jsonSlides)[0];
            //let updatedSlide = (presentationParser.GetPresentation() as Presentation).getSlides()[0];
            updatedSlides[index] = updatedSlide;
            if (updatedSlide) {
                let analysisVisitor = new AnalysisVisitor();
                analysisVisitor.visitSlideNode(updatedSlide);
                setSlideAnalysis(analysisVisitor.getResult());
            }
            updatedLanes[selectedLaneIndex].slides = updatedSlides;
            return updatedLanes;
        });
    }

    function updateEditor() {
        if (lanes[selectedLaneIndex].slides[selectedSlideIndex] == null) {
            setEditorData("");
            return;
        }
        const visitor = new MarkdownVisitor();
        visitor.visitSlideNode(
            lanes[selectedLaneIndex].slides[selectedSlideIndex]!,
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
                    deleteLane={deleteLane}
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
                    regenerateSlide={regenerateSlide}
                    constraints={constraints}
                    slideAnalysis={slideAnalysis}
                />
            </Grid>
        </Grid>
    );
};

export default LaneContainer;
