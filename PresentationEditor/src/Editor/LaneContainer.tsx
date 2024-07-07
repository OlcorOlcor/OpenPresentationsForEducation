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
    selectLane(index: number): void;
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
    selectLane,
    otherLaneIndex,
    addLane,
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
        lanes[selectedLaneIndex].outputsAsPresentation(),
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
            let resultLanes: Lane[] = [];
            updatedLanes.forEach((lane) => {
                resultLanes.push(new Lane([...lane.getContent(), null], lane.getName(), lane.outputsAsPresentation()));
            });
            return resultLanes;
        });
    }

    function addSlideAt(index: number) {
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            let resultLanes: Lane[] = [];
            updatedLanes.forEach((lane) => {
                resultLanes.push(new Lane([...lane.getContent().slice(0, index + 1), null, ...lane.getContent().slice(index + 1)], lane.getName(), lane.outputsAsPresentation()));
            });
            return resultLanes;
        });
    }

    function deleteSlideAt(index: number) {
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            let returnLanes: Lane[] = [];
            updatedLanes.forEach((lane) => {
                let updatedSlides = lane.getContent().filter((_, slideIndex) => slideIndex !== index,);
                returnLanes.push(new Lane(updatedSlides, lane.getName(), lane.outputsAsPresentation()));
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
            let updatedSlides = [...updatedLanes[selectedLaneIndex].getContent()];
            let active = (updatedSlides[index] == null) ? true : !updatedSlides[index]!.isActive();
            let updatedSlide = (updatedSlides[index] == null) ? new SlideElement([]) : new SlideElement(updatedSlides[index]!.getContent(), active);
            updatedSlides[index] = updatedSlide;
            updatedLanes[selectedLaneIndex] = new Lane(updatedSlides, updatedLanes[selectedLaneIndex].getName(), updatedLanes[selectedLaneIndex].outputsAsPresentation());
            return updatedLanes;
        });
    }

    function regenerateSlide(index: number) {
        let markdownParser = new MarkdownParser();
        let jsonSlides = markdownParser.parseMarkdown(editorData);
        let presentationParser = new PresentationParser();
        setLanes((oldLanes) => {
            let updatedLanes = [...oldLanes];
            let updatedSlides = [...updatedLanes[selectedLaneIndex].getContent()];
            let updatedSlide = presentationParser.getSlides(jsonSlides)[0];
            updatedSlides[index] = updatedSlide;
            if (updatedSlide) {
                let analysisVisitor = new AnalysisVisitor();
                analysisVisitor.visitSlideNode(updatedSlide);
                setSlideAnalysis(analysisVisitor.getResult());
            }
            updatedLanes[selectedLaneIndex] = new Lane(updatedSlides, updatedLanes[selectedLaneIndex].getName(), updatedLanes[selectedLaneIndex].outputsAsPresentation());
            return updatedLanes;
        });
    }

    function updateEditor() {
        if (lanes[selectedLaneIndex].getContent()[selectedSlideIndex] == null) {
            setEditorData("");
            return;
        }
        const visitor = new MarkdownVisitor();
        visitor.visitSlideNode(
            lanes[selectedLaneIndex].getContent()[selectedSlideIndex]!,
        );
        setEditorData(visitor.getResult());
    }

    return (
        <Grid container direction="column" style={{ height: "100%" }}>
            <Grid item>
                <LaneMenu
                    lanes={lanes}
                    setLanes={setLanes}
                    selectedLaneIndex={selectedLaneIndex}
                    selectLane={selectLane}
                    otherLaneIndex={otherLaneIndex}
                    setSlideMode={setSlideMode}
                    setEditorData={setEditorData}
                    editorView={editorView}
                    setEditorView={setEditorView}
                    addLane={addLane}
                    deleteLane={deleteLane}
                />
            </Grid>
            <Grid item xs style={{ height: "calc(100% - 64px)" }}>
                <EditorModule
                    editorData={editorData}
                    setEditorData={setEditorData}
                    slides={lanes[selectedLaneIndex].getContent()}
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
